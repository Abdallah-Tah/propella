<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Models\Embedding;
use App\Models\Generation;
use App\Jobs\GenerateProposal;
use Illuminate\Support\Str;

class ProposalController extends Controller
{
    public function generate(Request $request)
    {
        $validated = $request->validate([
            'job' => 'required|array',
            'job.title' => 'required|string|max:500',
            'job.description' => 'required|string|max:10000',
            'job.skills' => 'nullable|array',
            'job.screening_questions' => 'nullable|array',
            'settings' => 'nullable|array'
        ]);

        $job = $validated['job'];
        $settings = $validated['settings'] ?? [];

        // User-adjustable settings
        $tone = $settings['tone'] ?? 'professional';
        $length = $settings['length'] ?? 'medium';
        $model = $settings['model'] ?? 'gpt-4o-mini';

        try {
            // For now, skip vector similarity search since we have no embeddings
            $snippets = [];

            // Build prompt
            $promptBody = view('prompts.proposal', compact('job', 'snippets'))
                ->render();

            // Build system prompt from settings
            $lengthGuidance = [
                'short' => 'Keep it ~120-160 words.',
                'medium' => 'Keep it ~200-300 words.',
                'long' => 'Keep it ~350-500 words.'
            ][$length] ?? 'Keep it ~200-300 words.';

            $systemPrompt = sprintf(
                'You are an expert freelancer writing winning Upwork proposals. Tone: %s. %s Avoid clichés, be specific, quantify results, and close with a clear CTA.',
                $tone,
                $lengthGuidance
            );

            // Generate proposal using PrismPHP
            $response = Prism::text()
                ->using(Provider::OpenAI, $model)
                ->withSystemPrompt($systemPrompt)
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
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to generate proposal',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function generateAsync(Request $request)
    {
        $validated = $request->validate([
            'job' => 'required|array',
            'job.title' => 'required|string|max:500',
            'job.description' => 'required|string|max:10000',
            'job.skills' => 'nullable|array',
            'settings' => 'nullable|array'
        ]);

        $job = $validated['job'];
        $settings = $validated['settings'] ?? [];

        // Dispatch job to queue
        GenerateProposal::dispatch($request->user(), $job, $settings);

        return response()->json([
            'message' => 'Proposal generation started. Check back in a few moments.',
            'queued' => true
        ]);
    }
}
