<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Prism\Prism\Prism;
use Prism\Prism\Enums\Provider;
use App\Models\Embedding;
use App\Models\Generation;
use App\Models\Profile;
use App\Models\ScreeningAnswer;
use App\Models\JobApplication;
use App\Models\PortfolioItem;
use App\Jobs\GenerateProposal;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

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
        $user = $request->user();

        // User-adjustable settings
        $tone = $settings['tone'] ?? 'professional';
        $length = $settings['length'] ?? 'medium';
        $model = $settings['model'] ?? 'gpt-4o-mini';

        try {
            // Enhanced context gathering
            $userProfile = $user->profile ?? null;
            $featuredPortfolio = $user->portfolioItems()->featured()->limit(3)->get();
            $relevantPortfolio = $this->getRelevantPortfolio($user, $job);
            
            // Get screening answer suggestions
            $screeningAnswers = $this->getScreeningAnswerSuggestions($user, $job['screening_questions'] ?? []);

            // Build enhanced context
            $context = [
                'profile' => $userProfile,
                'portfolio' => $featuredPortfolio->merge($relevantPortfolio)->unique('id')->take(5),
                'screening_answers' => $screeningAnswers
            ];

            // Build prompt with enhanced context
            $promptBody = view('prompts.enhanced-proposal', compact('job', 'context'))
                ->render();

            // Build system prompt from settings
            $lengthGuidance = [
                'short' => 'Keep it ~120-160 words.',
                'medium' => 'Keep it ~200-300 words.',
                'long' => 'Keep it ~350-500 words.'
            ][$length] ?? 'Keep it ~200-300 words.';

            $systemPrompt = sprintf(
                'You are an expert freelancer writing winning Upwork proposals. Use the provided profile and portfolio context to personalize the proposal. Tone: %s. %s Avoid clichés, be specific, quantify results, and close with a clear CTA.',
                $tone,
                $lengthGuidance
            );

            // Generate proposal using PrismPHP
            $response = Prism::text()
                ->using(Provider::OpenAI, $model)
                ->withSystemPrompt($systemPrompt)
                ->withPrompt($promptBody)
                ->asText();

            // Save generation with enhanced data
            $gen = Generation::create([
                'user_id' => $user->id,
                'job_hash' => md5($job['title'] . $job['description']),
                'source_json' => $job,
                'output_md' => $response->text ?? null,
                'tokens_in' => $response->usage->inputTokens ?? 0,
                'tokens_out' => $response->usage->outputTokens ?? 0,
                'cost_cents' => $this->calculateCost($response->usage),
                'status' => 'success'
            ]);

            return response()->json([
                'id' => $gen->id,
                'proposal_md' => $response->text ?? '',
                'screening_answers' => $screeningAnswers,
                'suggested_portfolio' => $context['portfolio']->map(function ($item) {
                    return [
                        'id' => $item->id,
                        'title' => $item->title,
                        'description' => Str::limit($item->description, 100),
                        'first_image' => $item->first_image,
                        'project_url' => $item->project_url,
                    ];
                }),
                'profile_data' => $userProfile ? [
                    'hourly_rate' => $userProfile->default_hourly_rate,
                    'availability' => $userProfile->weekly_availability,
                    'specialization' => $userProfile->specialization,
                ] : null,
                'usage' => [
                    'input_tokens' => $response->usage->inputTokens ?? 0,
                    'output_tokens' => $response->usage->outputTokens ?? 0,
                    'cost_cents' => $this->calculateCost($response->usage),
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

    // Enhanced workflow methods
    public function saveApplication(Request $request)
    {
        $validated = $request->validate([
            'job_url' => 'required|url',
            'job_title' => 'required|string|max:255',
            'client_name' => 'nullable|string|max:255',
            'job_description' => 'required|string',
            'budget_type' => 'required|in:hourly,fixed',
            'budget_min' => 'nullable|numeric|min:0',
            'budget_max' => 'nullable|numeric|min:0',
            'proposal_text' => 'required|string',
            'cover_letter' => 'nullable|string',
            'bid_amount' => 'required|numeric|min:0',
            'timeline_estimate' => 'nullable|string',
            'screening_questions' => 'nullable|array',
            'attachments' => 'nullable|array',
            'upwork_job_id' => 'nullable|string',
            'auto_filled' => 'boolean',
        ]);

        $application = JobApplication::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'screening_questions_json' => $validated['screening_questions'] ?? [],
            'attachments_json' => $validated['attachments'] ?? [],
            'status' => 'draft'
        ]);

        return response()->json([
            'id' => $application->id,
            'message' => 'Application saved successfully',
            'status' => $application->status
        ]);
    }

    public function submitApplication(Request $request, JobApplication $application)
    {
        // Ensure user owns this application
        if ($application->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $application->update([
            'status' => 'submitted',
            'submitted_at' => now()
        ]);

        // Save screening answers for future use
        $this->saveScreeningAnswers($request->user(), $application);

        return response()->json([
            'message' => 'Application submitted successfully',
            'status' => $application->status,
            'submitted_at' => $application->submitted_at
        ]);
    }

    public function getApplications(Request $request)
    {
        $applications = $request->user()
            ->jobApplications()
            ->with(['user'])
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return response()->json($applications);
    }

    // Helper methods
    private function getRelevantPortfolio($user, $job)
    {
        $jobSkills = $job['skills'] ?? [];
        $jobCategory = $this->categorizeJob($job);

        return $user->portfolioItems()
            ->where(function ($query) use ($jobSkills, $jobCategory) {
                if ($jobCategory) {
                    $query->where('category', $jobCategory);
                }
                // Add skill-based matching here when we implement vector search
            })
            ->public()
            ->ordered()
            ->limit(3)
            ->get();
    }

    private function getScreeningAnswerSuggestions($user, $screeningQuestions)
    {
        $suggestions = [];

        foreach ($screeningQuestions as $question) {
            $questionHash = md5($question);
            
            // Look for exact match first
            $exactMatch = ScreeningAnswer::where('user_id', $user->id)
                ->where('question_hash', $questionHash)
                ->orderBy('confidence_score', 'desc')
                ->first();

            if ($exactMatch) {
                $suggestions[] = [
                    'question' => $question,
                    'suggested_answer' => $exactMatch->answer_text,
                    'confidence' => $exactMatch->confidence_score,
                    'times_used' => $exactMatch->times_used,
                    'match_type' => 'exact'
                ];
                $exactMatch->markAsUsed();
            } else {
                // Look for similar questions
                $similarAnswers = ScreeningAnswer::findSimilarQuestions($question, $user->id);
                
                if (!empty($similarAnswers)) {
                    $suggestions[] = [
                        'question' => $question,
                        'suggested_answer' => $similarAnswers[0]['answer_text'],
                        'confidence' => $similarAnswers[0]['confidence_score'],
                        'times_used' => $similarAnswers[0]['times_used'],
                        'match_type' => 'similar',
                        'original_question' => $similarAnswers[0]['question_text']
                    ];
                } else {
                    $suggestions[] = [
                        'question' => $question,
                        'suggested_answer' => null,
                        'confidence' => 0,
                        'times_used' => 0,
                        'match_type' => 'none'
                    ];
                }
            }
        }

        return $suggestions;
    }

    private function calculateCost($usage)
    {
        if (!$usage) return 0;

        // GPT-4o-mini pricing (example)
        $inputCostPer1k = 0.15; // cents
        $outputCostPer1k = 0.6; // cents

        $inputTokens = $usage->inputTokens ?? 0;
        $outputTokens = $usage->outputTokens ?? 0;

        $inputCost = ($inputTokens / 1000) * $inputCostPer1k;
        $outputCost = ($outputTokens / 1000) * $outputCostPer1k;

        return round($inputCost + $outputCost, 2);
    }

    private function categorizeJob($job)
    {
        $title = strtolower($job['title']);
        $description = strtolower($job['description']);
        $content = $title . ' ' . $description;

        // Simple categorization - could be enhanced with ML
        if (str_contains($content, 'web') || str_contains($content, 'website') || str_contains($content, 'frontend') || str_contains($content, 'backend')) {
            return 'web-development';
        }
        if (str_contains($content, 'mobile') || str_contains($content, 'app') || str_contains($content, 'ios') || str_contains($content, 'android')) {
            return 'mobile-app';
        }
        if (str_contains($content, 'design') || str_contains($content, 'ui') || str_contains($content, 'ux') || str_contains($content, 'graphic')) {
            return 'design';
        }
        if (str_contains($content, 'data') || str_contains($content, 'analytics') || str_contains($content, 'machine learning') || str_contains($content, 'ai')) {
            return 'data-science';
        }

        return null;
    }

    private function saveScreeningAnswers($user, $application)
    {
        $questions = $application->screening_questions ?? [];

        foreach ($questions as $qa) {
            if (!isset($qa['question']) || !isset($qa['answer'])) continue;

            ScreeningAnswer::updateOrCreate([
                'user_id' => $user->id,
                'question_hash' => md5($qa['question'])
            ], [
                'question_text' => $qa['question'],
                'answer_text' => $qa['answer'],
                'job_category' => $this->categorizeJob($application->toArray()),
                'confidence_score' => 8, // Default high confidence for submitted answers
                'times_used' => 1,
                'last_used_at' => now()
            ]);
        }
    }
}
