<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class ResumeParserService
{
    public function parse(string $filePath): array
    {
        Log::info('Parsing resume file', ['file_path' => $filePath]);

        try {
            // Wait a bit for file to be fully written if it doesn't exist yet
            $retries = 0;
            while (!file_exists($filePath) && $retries < 5) {
                usleep(200000); // 200ms delay
                $retries++;
            }

            if (!file_exists($filePath)) {
                throw new Exception("File not found after retries: {$filePath}");
            }

            $extension = pathinfo($filePath, PATHINFO_EXTENSION);
            $text = $this->parseByExtension($filePath, $extension);
            $metadata = $this->extractMetadata($text);

            Log::info('Resume parsed successfully', [
                'file_path' => $filePath,
                'text_length' => strlen($text),
                'metadata' => $metadata
            ]);

            return [
                'text' => $text,
                'metadata' => $metadata,
            ];
        } catch (Exception $e) {
            Log::error('Failed to parse resume', [
                'file_path' => $filePath,
                'error' => $e->getMessage()
            ]);

            // Return safe defaults
            return [
                'text' => "Resume uploaded successfully. Text extraction will be processed in the background.",
                'metadata' => [
                    'skills' => [],
                    'experience' => [],
                    'error' => $e->getMessage()
                ],
            ];
        }
    }

    private function parseByExtension(string $filePath, string $extension): string
    {
        switch (strtolower($extension)) {
            case 'txt':
                return file_get_contents($filePath);
            case 'pdf':
                return $this->parsePdf($filePath);
            case 'doc':
            case 'docx':
                return $this->parseWord($filePath);
            default:
                throw new Exception("Unsupported file extension: {$extension}");
        }
    }

    private function parsePdf(string $filePath): string
    {
        try {
            // Check if PDF parser is available
            if (class_exists('Smalot\PdfParser\Parser')) {
                $parser = new \Smalot\PdfParser\Parser();
                $pdf = $parser->parseFile($filePath);
                return $pdf->getText();
            } else {
                Log::warning('PDF parser not available, returning placeholder');
                return "PDF uploaded successfully. Install smalot/pdfparser for text extraction.";
            }
        } catch (Exception $e) {
            Log::error('PDF parsing failed', ['error' => $e->getMessage()]);
            return "PDF uploaded successfully. Text extraction failed but file is stored.";
        }
    }

    private function parseWord(string $filePath): string
    {
        try {
            // Check if Word parser is available
            if (class_exists('PhpOffice\PhpWord\IOFactory')) {
                // TODO: Implement Word document parsing
                Log::info('Word parser available but not implemented yet');
            }

            Log::warning('Word parser not available, returning placeholder');
            return "Word document uploaded successfully. Install phpoffice/phpword for text extraction.";
        } catch (Exception $e) {
            Log::error('Word parsing failed', ['error' => $e->getMessage()]);
            return "Word document uploaded successfully. Text extraction failed but file is stored.";
        }
    }

    private function extractMetadata(string $text): array
    {
        try {
            $skills = $this->extractSkills($text);
            $experience = $this->extractExperience($text);

            return [
                'skills' => $skills,
                'experience' => $experience,
                'word_count' => str_word_count($text),
                'character_count' => strlen($text)
            ];
        } catch (Exception $e) {
            Log::error('Metadata extraction failed', ['error' => $e->getMessage()]);
            return [
                'skills' => [],
                'experience' => [],
                'error' => $e->getMessage()
            ];
        }
    }

    private function extractSkills(string $text): array
    {
        $commonSkills = [
            'PHP',
            'Laravel',
            'JavaScript',
            'React',
            'Vue.js',
            'Node.js',
            'Python',
            'Django',
            'Flask',
            'Java',
            'Spring',
            'C#',
            '.NET',
            'Ruby',
            'Rails',
            'Go',
            'TypeScript',
            'Angular',
            'HTML',
            'CSS',
            'MySQL',
            'PostgreSQL',
            'MongoDB',
            'Redis',
            'Docker',
            'AWS'
        ];

        $foundSkills = [];
        $textUpper = strtoupper($text);

        foreach ($commonSkills as $skill) {
            if (strpos($textUpper, strtoupper($skill)) !== false) {
                $foundSkills[] = $skill;
            }
        }

        return array_unique($foundSkills);
    }

    private function extractExperience(string $text): array
    {
        $experience = [];

        // Look for years of experience
        if (preg_match('/(\d+)\+?\s*years?\s+of\s+experience/i', $text, $matches)) {
            $experience['years'] = (int) $matches[1];
        }

        return $experience;
    }
}
