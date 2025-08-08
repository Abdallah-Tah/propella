<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Models\Embedding;
use App\Models\Generation;
use Illuminate\Support\Str;

class ProposalController extends Controller
{
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'job' => 'required|array',
            'settings' => 'nullable|array'
        ]);

        $job = $validated['job'];

        // Convert job description to embedding vector
        $jobVector = app('prism.embedding')
            ->using(Provider::OpenAI, 'text-embedding-3-small')
            ->embed($job['description']);

        // Retrieve top-k resume chunks
        $snippets = Embedding::orderByRaw('embedding <=> ?', [$jobVector])
            ->limit(6)
            ->pluck('metadata_json')
            ->toArray();

        // Build prompt
        $promptBody = view('prompts.proposal', compact('job', 'snippets'))
            ->render();

        // Generate proposal using PrismPHP
        $response = Prism::text()
            ->using(Provider::OpenAI, 'gpt-4.1-mini')
            ->withSystemPrompt('You write tight, client-winning Upwork proposals. Be specific, quantify results, avoid clichés.')
            ->withPrompt($promptBody)
            ->asText();

        // Save generation
        $gen = Generation::create([
            'user_id' => $request->user()?->id,
            'job_hash' => Str::uuid(),
            'source_json' => $job,
            'output_md' => $response->text ?? null,
            'tokens_in' => $response->usage->inputTokens ?? 0,
            'tokens_out' => $response->usage->outputTokens ?? 0,
            'cost_cents' => 0,
            'status' => 'success'
        ]);

        return response()->json([
            'id' => $gen->id,
            'proposal_md' => $response->text ?? '',
            'answers' => [],
            'coverage' => [],
            'usage' => [
                'input_tokens' => $response->usage->inputTokens ?? 0,
                'output_tokens' => $response->usage->outputTokens ?? 0,
            ]
        ]);
    }
}
