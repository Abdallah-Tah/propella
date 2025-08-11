<?php

namespace App\Services;

use App\Models\Resume;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use Dompdf\Dompdf;
use Dompdf\Options;

class ResumeFileEnhancer
{
    public function enhanceResumeFile(Resume $resume): bool
    {
        try {
            Log::info('Starting file enhancement for resume', [
                'resume_id' => $resume->id,
                'original_file' => $resume->file_path
            ]);

            // Step 1: Extract and enhance the text content
            $enhancedContent = $this->generateEnhancedContent($resume);

            // Step 2: Create an enhanced PDF file
            $enhancedFilePath = $this->createEnhancedPDF($resume, $enhancedContent);

            // Step 3: Update the resume record
            $resume->update([
                'enhanced_file_path' => $enhancedFilePath,
                'enhanced_text' => $enhancedContent['enhanced_text'],
                'is_ai_generated' => true,
                'enhancement_status' => 'completed',
                'enhancement_completed_at' => now()
            ]);

            Log::info('Resume file enhancement completed', [
                'resume_id' => $resume->id,
                'enhanced_file_path' => $enhancedFilePath
            ]);

            return true;
        } catch (\Exception $e) {
            Log::error('Resume file enhancement failed', [
                'resume_id' => $resume->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            $resume->update([
                'enhancement_status' => 'failed',
                'enhancement_error' => $e->getMessage()
            ]);

            return false;
        }
    }

    private function generateEnhancedContent(Resume $resume): array
    {
        // Use PrismPHP to enhance the resume content
        $prompt = $this->buildEnhancementPrompt($resume);

        $response = Prism::text()
            ->using(Provider::OpenAI, 'gpt-4o-mini')
            ->withSystemPrompt('You are an expert resume writer. Transform the provided resume into a high-impact, ATS-optimized version. Focus on quantifiable achievements, strong action verbs, and professional formatting. Return the enhanced content in a structured format.')
            ->withPrompt($prompt)
            ->asText();

        return [
            'enhanced_text' => $response->text,
            'original_text' => $resume->extracted_text,
            'improvements_applied' => $this->extractImprovements($response->text)
        ];
    }

    private function buildEnhancementPrompt(Resume $resume): string
    {
        return "
        Please enhance this resume content to make it more impactful and ATS-friendly:

        ORIGINAL RESUME CONTENT:
        {$resume->extracted_text}

        ENHANCEMENT REQUIREMENTS:
        1. Add quantifiable metrics and achievements where possible
        2. Use strong action verbs (achieved, implemented, optimized, etc.)
        3. Improve keyword density for ATS optimization
        4. Enhance job descriptions to show business impact
        5. Maintain professional tone and formatting
        6. Ensure consistency across all sections

        Please return the enhanced resume content in a clean, professional format.
        ";
    }

    private function createEnhancedPDF(Resume $resume, array $enhancedContent): string
    {
        // Configure PDF options
        $options = new Options();
        $options->set('defaultFont', 'Arial');
        $options->set('isHtml5ParserEnabled', true);
        $options->set('isPhpEnabled', true);

        $dompdf = new Dompdf($options);

        // Generate HTML template for the enhanced resume
        $html = $this->generateResumeHTML($resume, $enhancedContent);

        $dompdf->loadHtml($html);
        $dompdf->setPaper('A4', 'portrait');
        $dompdf->render();

        // Generate unique filename for enhanced version
        $timestamp = now()->format('Y-m-d_H-i-s');
        $filename = 'enhanced_' . pathinfo($resume->original_name, PATHINFO_FILENAME) . '_' . $timestamp . '.pdf';
        $enhancedPath = 'private/resumes/enhanced/' . $filename;

        // Save the enhanced PDF
        Storage::put($enhancedPath, $dompdf->output());

        return $enhancedPath;
    }

    private function generateResumeHTML(Resume $resume, array $enhancedContent): string
    {
        // Parse the enhanced content to extract different sections
        $sections = $this->parseEnhancedContent($enhancedContent['enhanced_text']);

        return view('templates.enhanced-resume', [
            'resume' => $resume,
            'sections' => $sections,
            'enhanced_content' => $enhancedContent
        ])->render();
    }

    private function parseEnhancedContent(string $enhancedText): array
    {
        // Simple parsing logic - in production you'd want more sophisticated parsing
        $sections = [
            'header' => '',
            'summary' => '',
            'experience' => '',
            'skills' => '',
            'education' => ''
        ];

        // Basic section detection (this could be much more sophisticated)
        $lines = explode("\n", $enhancedText);
        $currentSection = 'header';

        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) continue;

            // Detect section headers
            $lowerLine = strtolower($line);
            if (str_contains($lowerLine, 'summary') || str_contains($lowerLine, 'profile')) {
                $currentSection = 'summary';
                continue;
            } elseif (str_contains($lowerLine, 'experience') || str_contains($lowerLine, 'employment')) {
                $currentSection = 'experience';
                continue;
            } elseif (str_contains($lowerLine, 'skills')) {
                $currentSection = 'skills';
                continue;
            } elseif (str_contains($lowerLine, 'education')) {
                $currentSection = 'education';
                continue;
            }

            $sections[$currentSection] .= $line . "\n";
        }

        return $sections;
    }

    private function extractImprovements(string $enhancedText): array
    {
        return [
            'quantified_achievements' => substr_count(strtolower($enhancedText), '%') + substr_count($enhancedText, '$'),
            'action_verbs_count' => $this->countActionVerbs($enhancedText),
            'keyword_density' => $this->calculateKeywordDensity($enhancedText),
        ];
    }

    private function countActionVerbs(string $text): int
    {
        $actionVerbs = [
            'achieved',
            'implemented',
            'optimized',
            'increased',
            'developed',
            'managed',
            'led',
            'created',
            'improved',
            'delivered',
            'executed',
            'designed',
            'built',
            'established'
        ];

        $count = 0;
        foreach ($actionVerbs as $verb) {
            $count += substr_count(strtolower($text), $verb);
        }

        return $count;
    }

    private function calculateKeywordDensity(string $text): float
    {
        $words = str_word_count(strtolower($text), 1);
        $totalWords = count($words);

        $techKeywords = [
            'javascript',
            'python',
            'react',
            'node',
            'sql',
            'database',
            'api',
            'cloud',
            'aws',
            'docker',
            'kubernetes',
            'agile',
            'scrum',
            'ci/cd',
            'git'
        ];

        $keywordCount = 0;
        foreach ($techKeywords as $keyword) {
            $keywordCount += substr_count(implode(' ', $words), $keyword);
        }

        return $totalWords > 0 ? ($keywordCount / $totalWords) * 100 : 0;
    }
}
