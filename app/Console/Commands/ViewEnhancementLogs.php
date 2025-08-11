<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Collection;

class ViewEnhancementLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'logs:enhancement 
                            {--lines=50 : Number of lines to show}
                            {--type=all : Type of logs (all, enhancement, downloads)}
                            {--tail : Follow the log file in real-time}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'View AI Enhancement and Resume Download logs with detailed insights';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $lines = (int) $this->option('lines');
        $type = $this->option('type');
        $tail = $this->option('tail');

        $this->info("🤖 AI Enhancement & Resume Management Logs");
        $this->line("═══════════════════════════════════════════════════");

        if ($tail) {
            $this->info("Following logs in real-time... Press Ctrl+C to stop.");
            $this->tailLogs($type);
            return 0;
        }

        // Show log statistics
        $this->showLogStatistics();
        $this->line("");

        // Display logs based on type
        switch ($type) {
            case 'enhancement':
                $this->displayEnhancementLogs($lines);
                break;
            case 'downloads':
                $this->displayDownloadLogs($lines);
                break;
            default:
                $this->displayAllLogs($lines);
        }

        $this->line("");
        $this->info("💡 Understanding AI Enhancement Process:");
        $this->explainEnhancementProcess();

        return 0;
    }

    private function showLogStatistics(): void
    {
        $enhancementLogPath = storage_path('logs/ai-enhancement.log');
        $downloadLogPath = storage_path('logs/resume-downloads.log');

        $enhancementExists = File::exists($enhancementLogPath);
        $downloadExists = File::exists($downloadLogPath);

        $this->table(['Log Type', 'Status', 'Size', 'Last Modified'], [
            [
                'AI Enhancement',
                $enhancementExists ? '✅ Active' : '❌ No Data',
                $enhancementExists ? $this->formatBytes(File::size($enhancementLogPath)) : 'N/A',
                $enhancementExists ? date('Y-m-d H:i:s', File::lastModified($enhancementLogPath)) : 'N/A'
            ],
            [
                'Resume Downloads',
                $downloadExists ? '✅ Active' : '❌ No Data',
                $downloadExists ? $this->formatBytes(File::size($downloadLogPath)) : 'N/A',
                $downloadExists ? date('Y-m-d H:i:s', File::lastModified($downloadLogPath)) : 'N/A'
            ]
        ]);
    }

    private function displayEnhancementLogs(int $lines): void
    {
        $logPath = storage_path('logs/ai-enhancement.log');

        if (!File::exists($logPath)) {
            $this->warn("🔍 AI Enhancement log file not found. Try uploading and enhancing a resume first!");
            return;
        }

        $this->info("🚀 AI Enhancement Process Logs (Last {$lines} lines):");
        $this->line("────────────────────────────────────────────────────");

        $logContent = $this->tailFile($logPath, $lines);
        $this->displayFormattedLogs($logContent, 'enhancement');
    }

    private function displayDownloadLogs(int $lines): void
    {
        $logPath = storage_path('logs/resume-downloads.log');

        if (!File::exists($logPath)) {
            $this->warn("📥 Download log file not found. Try downloading a resume first!");
            return;
        }

        $this->info("📥 Resume Download Logs (Last {$lines} lines):");
        $this->line("────────────────────────────────────────────────────");

        $logContent = $this->tailFile($logPath, $lines);
        $this->displayFormattedLogs($logContent, 'downloads');
    }

    private function displayAllLogs(int $lines): void
    {
        $this->displayEnhancementLogs($lines);
        $this->line("");
        $this->displayDownloadLogs($lines);
    }

    private function displayFormattedLogs(string $content, string $type): void
    {
        $lines = explode("\n", trim($content));

        foreach ($lines as $line) {
            if (empty($line)) continue;

            // Parse JSON log entries
            if (strpos($line, '{') !== false) {
                $jsonPart = substr($line, strpos($line, '{'));
                $logData = json_decode($jsonPart, true);

                if ($logData) {
                    $this->formatLogEntry($logData, $type);
                } else {
                    $this->line($line);
                }
            } else {
                $this->line($line);
            }
        }
    }

    private function formatLogEntry(array $logData, string $type): void
    {
        $timestamp = $logData['datetime'] ?? 'Unknown time';
        $event = $logData['context']['event'] ?? 'unknown';

        switch ($event) {
            case 'ai_enhancement_started':
                $this->info("🚀 [{$timestamp}] Enhancement Started");
                $this->line("   Resume: {$logData['context']['resume_name']}");
                $this->line("   User ID: {$logData['context']['user_id']}");
                $this->line("   File Type: {$logData['context']['file_type']} ({$logData['context']['file_size']} bytes)");
                break;

            case 'ai_enhancement_progress':
                $progress = $logData['context']['progress_percentage'];
                $stage = $logData['context']['current_stage'];
                $this->comment("⚡ [{$timestamp}] Progress: {$progress}% - {$stage}");
                if (isset($logData['context']['stage_details']['description'])) {
                    $this->line("   📋 {$logData['context']['stage_details']['description']}");
                }
                break;

            case 'ai_enhancement_completed':
                $processingTime = $logData['context']['processing_time_seconds'];
                $this->info("✅ [{$timestamp}] Enhancement Completed ({$processingTime}s)");
                if (isset($logData['context']['enhancement_results']['improvements'])) {
                    $improvements = $logData['context']['enhancement_results']['improvements'];
                    $this->line("   📈 Score: {$improvements['score_improvement']['before']}% → {$improvements['score_improvement']['after']}%");
                }
                break;

            case 'ai_enhancement_failed':
                $this->error("❌ [{$timestamp}] Enhancement Failed");
                $this->line("   Error: {$logData['context']['error_message']}");
                break;

            case 'resume_downloaded':
                $downloadType = $logData['context']['download_type'];
                $downloadCount = $logData['context']['download_count'];
                $icon = $downloadType === 'enhanced' ? '🤖' : '📄';
                $this->info("{$icon} [{$timestamp}] Resume Downloaded ({$downloadType})");
                $this->line("   File: {$logData['context']['resume_name']}");
                $this->line("   Total Downloads: {$downloadCount}");
                break;

            default:
                $message = $logData['message'] ?? ($logData['context']['message'] ?? 'Unknown event');
                $this->line("[{$timestamp}] {$message}");
        }

        $this->line("");
    }

    private function explainEnhancementProcess(): void
    {
        $this->line("How AI Enhancement Works:");
        $this->line("");

        $stages = [
            "1️⃣  Text Analysis" => "Analyzes resume content, identifies sections, extracts skills and experience",
            "2️⃣  Skills Optimization" => "Enhances keyword density, aligns with industry standards, prioritizes skills",
            "3️⃣  Experience Enhancement" => "Quantifies achievements, improves action verbs, emphasizes business impact",
            "4️⃣  Format Optimization" => "Ensures ATS compatibility, optimizes section hierarchy and readability",
            "5️⃣  Final Review" => "Grammar checking, consistency review, and final score calculation"
        ];

        foreach ($stages as $stage => $description) {
            $this->line("   <fg=cyan>{$stage}</fg=cyan> {$description}");
        }

        $this->line("");
        $this->info("🔍 To see real-time enhancement process:");
        $this->line("   php artisan logs:enhancement --tail");
        $this->line("");
        $this->info("💡 Pro Tips:");
        $this->line("   • Upload a resume and trigger AI enhancement to see detailed logs");
        $this->line("   • Download logs are tracked separately for analytics");
        $this->line("   • Each enhancement creates comprehensive improvement reports");
    }

    private function tailLogs(string $type): void
    {
        $logPaths = [];

        switch ($type) {
            case 'enhancement':
                $logPaths[] = storage_path('logs/ai-enhancement.log');
                break;
            case 'downloads':
                $logPaths[] = storage_path('logs/resume-downloads.log');
                break;
            default:
                $logPaths[] = storage_path('logs/ai-enhancement.log');
                $logPaths[] = storage_path('logs/resume-downloads.log');
        }

        $command = 'tail -f ' . implode(' ', array_filter($logPaths, fn($path) => File::exists($path)));

        if (empty($command) || $command === 'tail -f ') {
            $this->warn("No log files found to tail. Upload and enhance a resume first!");
            return;
        }

        passthru($command);
    }

    private function tailFile(string $path, int $lines): string
    {
        if (!File::exists($path)) {
            return '';
        }

        return shell_exec("tail -n {$lines} " . escapeshellarg($path)) ?: '';
    }

    private function formatBytes(int $bytes, int $precision = 2): string
    {
        $units = ['B', 'KB', 'MB', 'GB'];

        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }

        return round($bytes, $precision) . ' ' . $units[$i];
    }
}
