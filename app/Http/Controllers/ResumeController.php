<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use App\Models\Embedding;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

class ResumeController extends Controller
{
    public function index(Request $request)
    {
        $resumes = Resume::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('resume/index', [
            'resumes' => $resumes
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Resume upload started', [
            'user_id' => $request->user()->id,
            'has_file' => $request->hasFile('resume'),
            'files' => $request->allFiles(),
            'request_method' => $request->getMethod(),
            'content_type' => $request->header('Content-Type')
        ]);

        $validated = $request->validate([
            'resume' => 'required|file|mimes:pdf,doc,docx,txt|max:2048', // 2MB to match PHP limit
        ]);

        Log::info('Resume validation passed');

        $file = $request->file('resume');

        // Store the file
        $path = $file->store('resumes', 'private');

        // Create resume record
        $resume = Resume::create([
            'user_id' => $request->user()->id,
            'original_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_type' => $file->getClientOriginalExtension(),
            'file_size' => $file->getSize(),
            'is_processed' => false,
        ]);

        // Extract text (simplified - in real app you'd use PDF parsing libraries)
        $extractedText = $this->extractText($file);

        // Update with extracted text
        $resume->update([
            'extracted_text' => $extractedText,
            'is_processed' => true,
            'processed_at' => now(),
        ]);

        Log::info('Resume record updated');

        // Create embeddings for the text chunks
        $this->createEmbeddings($resume, $extractedText);

        Log::info('Resume processing completed');

        return redirect()->back()->with('success', 'Resume uploaded and processed successfully!');
    }

    private function extractText($file): string
    {
        // Simplified text extraction - in production you'd use:
        // - PDF parser for PDFs (e.g., spatie/pdf-to-text)
        // - PHPWord for Word documents
        // - Basic file_get_contents for text files

        if ($file->getClientOriginalExtension() === 'txt') {
            return file_get_contents($file->getRealPath());
        }

        // For now, return a placeholder - user can manually enter their experience
        return "Resume content will be extracted automatically in production. Please manually enter key skills and experience for now.";
    }

    private function createEmbeddings(Resume $resume, string $text): void
    {
        // Split text into chunks (simple sentence splitting)
        $chunks = array_filter(explode('.', $text), fn($chunk) => strlen(trim($chunk)) > 20);

        foreach ($chunks as $index => $chunk) {
            $chunk = trim($chunk);
            if (empty($chunk)) continue;

            try {
                // Generate embedding using PrismPHP
                $vector = app('prism.embedding')
                    ->using(Provider::OpenAI, 'text-embedding-3-small')
                    ->embed($chunk);

                // Store embedding
                Embedding::create([
                    'user_id' => $resume->user_id,
                    'resume_id' => $resume->id,
                    'chunk_text' => $chunk,
                    'chunk_index' => $index,
                    'embedding' => $vector,
                    'metadata_json' => [
                        'source' => 'resume',
                        'text' => $chunk,
                        'resume_id' => $resume->id,
                        'chunk_index' => $index,
                    ]
                ]);
            } catch (\Exception $e) {
                // Log error but continue processing
                logger()->error("Failed to create embedding for chunk {$index}: " . $e->getMessage());
            }
        }
    }

    public function destroy(Request $request, Resume $resume)
    {
        // Ensure user owns the resume
        if ($resume->user_id !== $request->user()->id) {
            abort(403);
        }

        // Delete file from storage
        Storage::disk('private')->delete($resume->file_path);

        // Delete embeddings
        $resume->embeddings()->delete();

        // Delete resume record
        $resume->delete();

        return redirect()->back()->with('success', 'Resume deleted successfully!');
    }
}
