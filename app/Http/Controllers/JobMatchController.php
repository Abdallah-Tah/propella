<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobMatch;
use App\Models\JobApplication;

class JobMatchController extends Controller
{
    public function index(Request $request)
    {
        $matches = $request->user()
            ->jobMatches()
            ->available()
            ->orderedByMatch()
            ->paginate(20);

        return response()->json([
            'matches' => $matches,
            'stats' => [
                'total_matches' => $request->user()->jobMatches()->count(),
                'high_matches' => $request->user()->jobMatches()->highMatch()->count(),
                'dismissed' => $request->user()->jobMatches()->where('is_dismissed', true)->count(),
                'applied' => $request->user()->jobMatches()->where('is_applied', true)->count(),
            ]
        ]);
    }

    public function show(Request $request, JobMatch $jobMatch)
    {
        // Ensure user owns this job match
        if ($jobMatch->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        return response()->json([
            'match' => $jobMatch,
            'ai_analysis' => $jobMatch->ai_analysis,
            'similar_applications' => $this->getSimilarApplications($request->user(), $jobMatch)
        ]);
    }

    public function dismiss(Request $request, JobMatch $jobMatch)
    {
        // Ensure user owns this job match
        if ($jobMatch->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $jobMatch->update(['is_dismissed' => true]);

        return response()->json([
            'message' => 'Job dismissed successfully',
            'status' => 'dismissed'
        ]);
    }

    public function applyToJob(Request $request, JobMatch $jobMatch)
    {
        // Ensure user owns this job match
        if ($jobMatch->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Create draft application from job match
        $application = JobApplication::create([
            'user_id' => $request->user()->id,
            'job_url' => $jobMatch->job_url,
            'job_title' => $jobMatch->job_title,
            'client_name' => $jobMatch->client_name,
            'job_description' => $jobMatch->job_description,
            'budget_type' => $jobMatch->budget_type,
            'budget_min' => $jobMatch->budget_min,
            'budget_max' => $jobMatch->budget_max,
            'proposal_text' => '', // Will be generated
            'bid_amount' => $jobMatch->budget_min ?? 0,
            'upwork_job_id' => $jobMatch->upwork_job_id,
            'auto_filled' => true,
            'status' => 'draft'
        ]);

        // Mark job match as applied
        $jobMatch->update([
            'is_applied' => true,
            'applied_at' => now()
        ]);

        return response()->json([
            'message' => 'Draft application created successfully',
            'application_id' => $application->id,
            'redirect_url' => "/applications/{$application->id}/edit"
        ]);
    }

    public function getRecommendations(Request $request)
    {
        $user = $request->user();
        
        // Get high-quality matches from the last week
        $recommendations = $user->jobMatches()
            ->available()
            ->recent()
            ->highMatch()
            ->limit(5)
            ->get();

        return response()->json([
            'recommendations' => $recommendations->map(function ($match) {
                return [
                    'id' => $match->id,
                    'job_title' => $match->job_title,
                    'client_name' => $match->client_name,
                    'match_score' => $match->match_score,
                    'match_grade' => $match->match_grade,
                    'budget_min' => $match->budget_min,
                    'budget_max' => $match->budget_max,
                    'posted_at' => $match->posted_at,
                    'recommendation_reason' => $match->recommendation_reason,
                ];
            }),
            'message' => count($recommendations) > 0 
                ? 'Found ' . count($recommendations) . ' high-quality job matches for you!'
                : 'No new high-quality matches found. Check back later!'
        ]);
    }

    public function updatePreferences(Request $request)
    {
        $validated = $request->validate([
            'min_match_score' => 'integer|min:1|max:100',
            'preferred_budget_min' => 'numeric|min:0',
            'preferred_budget_max' => 'numeric|min:0',
            'excluded_categories' => 'array',
            'notification_frequency' => 'in:immediate,daily,weekly,never'
        ]);

        // Store user preferences (could be in user profile or separate table)
        $profile = $request->user()->profile;
        if ($profile) {
            $settings = $profile->settings ?? [];
            $settings['job_match_preferences'] = $validated;
            $profile->update(['settings_json' => $settings]);
        }

        return response()->json([
            'message' => 'Job matching preferences updated successfully',
            'preferences' => $validated
        ]);
    }

    private function getSimilarApplications($user, $jobMatch)
    {
        return $user->jobApplications()
            ->where('job_title', 'like', '%' . substr($jobMatch->job_title, 0, 20) . '%')
            ->orWhere('job_description', 'like', '%' . substr($jobMatch->job_description, 0, 50) . '%')
            ->limit(3)
            ->get(['id', 'job_title', 'status', 'created_at', 'bid_amount']);
    }
}