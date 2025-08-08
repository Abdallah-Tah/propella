<?php

namespace App\Jobs;

use App\Models\Embedding;
use App\Models\Generation;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Str;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;

class GenerateProposal implements ShouldQueue
{
    use Queueable;

    public $tries = 3;
    public $timeout = 120;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public User $user,
        public array $jobData,
        public array $settings = []
    ) {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            // Convert job description to embedding vector (using the same approach as ProposalController)
            $jobVector = app('prism.embedding')
                ->using(Provider::OpenAI, 'text-embedding-3-small')
                ->embed($this->jobData['description']);

            // Retrieve top-k resume chunks
            $snippets = Embedding::orderByRaw('embedding <=> ?', [$jobVector])
                ->limit(6)
                ->get()
                ->map(function ($embedding) {
                    return [
                        'text' => $embedding->metadata_json['text'] ?? '',
                        'source' => $embedding->metadata_json['source'] ?? 'resume',
                    ];
                })
                ->toArray();

            // Build prompt
            $promptBody = view('prompts.proposal', [
                'job' => $this->jobData,
                'snippets' => $snippets
            ])->render();

            // Generate proposal using PrismPHP
            $response = Prism::text()
                ->using(Provider::OpenAI, 'gpt-4o-mini')
                ->withSystemPrompt('You write tight, client-winning Upwork proposals. Be specific, quantify results, avoid clichés.')
                ->withPrompt($promptBody)
                ->asText();

            // Calculate rough cost estimate (GPT-4o-mini pricing)
            $inputCost = ($response->usage->inputTokens ?? 0) * 0.00015 / 1000; // $0.15 per 1K tokens
            $outputCost = ($response->usage->outputTokens ?? 0) * 0.0006 / 1000; // $0.60 per 1K tokens
            $totalCostCents = round(($inputCost + $outputCost) * 100, 2);

            // Save generation
            Generation::create([
                'user_id' => $this->user->id,
                'job_hash' => Str::uuid(),
                'source_json' => $this->jobData,
                'output_md' => $response->text,
                'tokens_in' => $response->usage->inputTokens ?? 0,
                'tokens_out' => $response->usage->outputTokens ?? 0,
                'cost_cents' => $totalCostCents,
                'status' => 'success'
            ]);
        } catch (\Exception $e) {
            // Save failed generation for debugging
            Generation::create([
                'user_id' => $this->user->id,
                'job_hash' => Str::uuid(),
                'source_json' => $this->jobData,
                'output_md' => 'Error: ' . $e->getMessage(),
                'tokens_in' => 0,
                'tokens_out' => 0,
                'cost_cents' => 0,
                'status' => 'failed'
            ]);

            throw $e;
        }
    }
}
