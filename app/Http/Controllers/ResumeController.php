<?php

namespace App\Http\Controllers;

use App\Models\Resume;
use App\Models\Embedding;
use App\Services\ResumeEnhancementLogger;
use App\Services\ResumeFileEnhancer;
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

        try {
            $file = $request->file('resume');
            $filePath = $file->store('private/resumes');
            $fullPath = storage_path('app/' . $filePath);

            // Give the file system a moment to complete the write
            usleep(100000); // 100ms delay

            Log::info('File stored', [
                'stored_path' => $filePath,
                'full_path' => $fullPath,
                'file_exists' => file_exists($fullPath),
                'file_size' => file_exists($fullPath) ? filesize($fullPath) : 'N/A',
                'original_name' => $file->getClientOriginalName()
            ]);

            $resume = Resume::create([
                'user_id' => $request->user()->id,
                'original_name' => $file->getClientOriginalName(),
                'file_path' => $filePath,
                'file_type' => $file->getClientOriginalExtension(),
                'file_size' => $file->getSize(),
            ]);

            // Parse the file with proper error handling
            $parserService = new \App\Services\ResumeParserService();
            $parsedData = $parserService->parse($fullPath);

            $resume->update([
                'extracted_text' => $parsedData['text'],
                'metadata_json' => $parsedData['metadata'],
                'is_processed' => true,
                'processed_at' => now(),
            ]);

            Log::info('Resume parsed and metadata extracted', [
                'resume_id' => $resume->id,
                'metadata' => $parsedData['metadata']
            ]);

            Log::info('Resume uploaded successfully', [
                'resume_id' => $resume->id,
                'file_path' => $filePath
            ]);

            // Redirect back with success message
            return redirect()->back()->with('success', 'Resume uploaded successfully!');
        } catch (\Exception $e) {
            Log::error('Resume upload failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'file_info' => isset($file) ? [
                    'name' => $file->getClientOriginalName(),
                    'size' => $file->getSize(),
                    'mime' => $file->getClientMimeType()
                ] : null
            ]);

            // Redirect back with error message
            return redirect()->back()->with('error', 'Failed to upload resume: ' . $e->getMessage());
        }
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

    public function download(Request $request, Resume $resume)
    {
        Log::info('Resume download started', [
            'user_id' => $request->user()->id,
            'resume_id' => $resume->id,
            'resume_name' => $resume->original_name,
            'file_path' => $resume->file_path
        ]);

        // Ensure user owns the resume
        if ($resume->user_id !== $request->user()->id) {
            Log::warning('Unauthorized resume download attempt', [
                'user_id' => $request->user()->id,
                'resume_id' => $resume->id,
                'owner_id' => $resume->user_id
            ]);
            abort(403);
        }

        // Determine which version to download based on request parameter
        $version = $request->get('version', 'original'); // 'original' or 'enhanced'

        if ($version === 'enhanced' && $resume->enhanced_file_path && Storage::exists($resume->enhanced_file_path)) {
            $filePath = $resume->enhanced_file_path;
            $fileName = 'Enhanced_' . $resume->original_name;
            $downloadType = 'enhanced';
        } else {
            $filePath = $resume->file_path;
            $fileName = $resume->original_name;
            $downloadType = 'original';
        }

        // Check if file exists
        if (!Storage::exists($filePath)) {
            Log::error('Resume file not found', [
                'user_id' => $request->user()->id,
                'resume_id' => $resume->id,
                'file_path' => $filePath,
                'version' => $version
            ]);
            return redirect()->back()->with('error', 'Resume file not found!');
        }

        // Update download count and timestamp
        $resume->increment('download_count');
        $resume->update(['last_downloaded_at' => now()]);

        // Log the download with our enhancement logger
        ResumeEnhancementLogger::logResumeDownload($resume, $downloadType);

        Log::info('Resume download successful', [
            'user_id' => $request->user()->id,
            'resume_id' => $resume->id,
            'version' => $downloadType,
            'new_download_count' => $resume->download_count
        ]);

        return Storage::download($filePath, $fileName);
    }

    public function enhance(Request $request, Resume $resume)
    {
        // Ensure user owns the resume
        if ($resume->user_id !== $request->user()->id) {
            Log::warning('Unauthorized enhancement attempt', [
                'user_id' => $request->user()->id,
                'resume_id' => $resume->id,
                'owner_id' => $resume->user_id
            ]);
            abort(403);
        }

        try {
            // Start the enhancement process
            $resume->update([
                'enhancement_status' => 'processing',
                'enhancement_started_at' => now(),
                'enhancement_error' => null
            ]);

            // Log the start of enhancement with detailed context
            ResumeEnhancementLogger::logEnhancementStart($resume, [
                'user_agent' => $request->userAgent(),
                'ip_address' => $request->ip(),
                'file_type' => $resume->file_type,
                'file_size' => $resume->file_size
            ]);

            // In a real implementation, you would dispatch a job here:
            // EnhanceResumeJob::dispatch($resume);

            // For demonstration, we'll simulate the enhancement process
            $this->simulateEnhancementProcess($resume);

            return response()->json([
                'message' => 'AI Enhancement started successfully',
                'status' => 'processing',
                'estimated_completion' => now()->addMinutes(3)->toISOString(),
                'stages' => [
                    'text_analysis' => 'Analyzing resume content and structure',
                    'skills_optimization' => 'Optimizing skills section and keywords',
                    'experience_enhancement' => 'Enhancing work experience descriptions',
                    'format_optimization' => 'Optimizing resume format and structure',
                    'final_review' => 'Final quality check and validation'
                ]
            ]);
        } catch (\Exception $e) {
            // Log the failure with comprehensive details
            ResumeEnhancementLogger::logEnhancementFailure($resume, $e, [
                'request_data' => $request->all(),
                'user_agent' => $request->userAgent(),
                'ip_address' => $request->ip()
            ]);

            $resume->update([
                'enhancement_status' => 'failed',
                'enhancement_error' => $e->getMessage()
            ]);

            return response()->json([
                'error' => 'Enhancement failed: ' . $e->getMessage(),
                'details' => 'Please check the logs for detailed error information'
            ], 500);
        }
    }

    /**
     * Simulate the AI enhancement process with detailed logging
     */
    private function simulateEnhancementProcess(Resume $resume): void
    {
        // This would typically be handled by a queued job
        // For demonstration, we'll log the detailed process stages

        ResumeEnhancementLogger::logEnhancementStages($resume);

        // Actually create the enhanced file
        $fileEnhancer = new ResumeFileEnhancer();
        $enhancementSuccess = $fileEnhancer->enhanceResumeFile($resume);

        if ($enhancementSuccess) {
            // Generate final enhancement report
            $enhancementResults = ResumeEnhancementLogger::generateEnhancementReport($resume);

            $resume->update([
                'enhancement_status' => 'completed',
                'enhancement_completed_at' => now(),
                'enhancement_results' => $enhancementResults,
                'is_ai_generated' => true
            ]);

            ResumeEnhancementLogger::logEnhancementSuccess($resume, $enhancementResults);
        } else {
            $resume->update([
                'enhancement_status' => 'failed',
                'enhancement_error' => 'Failed to generate enhanced file'
            ]);
        }
    }

    public function destroy(Request $request, Resume $resume)
    {
        Log::info('Resume deletion started', [
            'user_id' => $request->user()->id,
            'resume_id' => $resume->id,
            'resume_name' => $resume->original_name
        ]);

        // Ensure user owns the resume
        if ($resume->user_id !== $request->user()->id) {
            Log::warning('Unauthorized deletion attempt', [
                'user_id' => $request->user()->id,
                'resume_id' => $resume->id,
                'owner_id' => $resume->user_id
            ]);
            abort(403);
        }

        // Delete files from storage
        Storage::delete($resume->file_path);
        if ($resume->enhanced_file_path) {
            Storage::delete($resume->enhanced_file_path);
        }

        // Delete embeddings
        $resume->embeddings()->delete();

        // Delete resume record
        $resume->delete();

        Log::info('Resume deleted successfully', [
            'user_id' => $request->user()->id,
            'resume_id' => $resume->id
        ]);

        return redirect()->back()->with('success', 'Resume deleted successfully!');
    }
}
