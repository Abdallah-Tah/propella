<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profile;

class ProfileManagementController extends Controller
{
    public function show(Request $request)
    {
        $profile = $request->user()->profile;
        
        if (!$profile) {
            return response()->json([
                'profile' => null,
                'message' => 'Profile not found. Please create your profile first.'
            ]);
        }

        return response()->json([
            'profile' => $profile,
            'completion_score' => $this->calculateCompletionScore($profile)
        ]);
    }

    public function store(Request $request)
    {
        // Check if profile already exists
        if ($request->user()->profile) {
            return response()->json([
                'error' => 'Profile already exists. Use PUT to update.'
            ], 409);
        }

        $validated = $request->validate([
            'default_hourly_rate' => 'nullable|numeric|min:5|max:10000',
            'weekly_availability' => 'nullable|integer|min:1|max:168',
            'bio' => 'nullable|string|max:2000',
            'skills' => 'nullable|array|max:50',
            'languages' => 'nullable|array|max:20',
            'certifications' => 'nullable|array|max:30',
            'portfolio_links' => 'nullable|array|max:20',
            'social_links' => 'nullable|array|max:10',
            'timezone' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'is_available' => 'boolean',
            'specialization' => 'nullable|string|max:500',
            'years_experience' => 'nullable|integer|min:0|max:50',
        ]);

        $profile = Profile::create([
            ...$validated,
            'user_id' => $request->user()->id,
            'skills_json' => $validated['skills'] ?? [],
            'languages_json' => $validated['languages'] ?? [],
            'certifications_json' => $validated['certifications'] ?? [],
            'portfolio_links_json' => $validated['portfolio_links'] ?? [],
            'social_links_json' => $validated['social_links'] ?? [],
        ]);

        return response()->json([
            'message' => 'Profile created successfully',
            'profile' => $profile,
            'completion_score' => $this->calculateCompletionScore($profile)
        ], 201);
    }

    public function update(Request $request)
    {
        $profile = $request->user()->profile;
        
        if (!$profile) {
            return response()->json([
                'error' => 'Profile not found. Please create a profile first.'
            ], 404);
        }

        $validated = $request->validate([
            'default_hourly_rate' => 'sometimes|nullable|numeric|min:5|max:10000',
            'weekly_availability' => 'sometimes|nullable|integer|min:1|max:168',
            'bio' => 'sometimes|nullable|string|max:2000',
            'skills' => 'sometimes|nullable|array|max:50',
            'languages' => 'sometimes|nullable|array|max:20',
            'certifications' => 'sometimes|nullable|array|max:30',
            'portfolio_links' => 'sometimes|nullable|array|max:20',
            'social_links' => 'sometimes|nullable|array|max:10',
            'timezone' => 'sometimes|nullable|string|max:100',
            'country' => 'sometimes|nullable|string|max:100',
            'is_available' => 'sometimes|boolean',
            'specialization' => 'sometimes|nullable|string|max:500',
            'years_experience' => 'sometimes|nullable|integer|min:0|max:50',
        ]);

        // Prepare update data
        $updateData = collect($validated)->except(['skills', 'languages', 'certifications', 'portfolio_links', 'social_links'])->toArray();
        
        // Handle JSON fields
        if (isset($validated['skills'])) {
            $updateData['skills_json'] = $validated['skills'];
        }
        if (isset($validated['languages'])) {
            $updateData['languages_json'] = $validated['languages'];
        }
        if (isset($validated['certifications'])) {
            $updateData['certifications_json'] = $validated['certifications'];
        }
        if (isset($validated['portfolio_links'])) {
            $updateData['portfolio_links_json'] = $validated['portfolio_links'];
        }
        if (isset($validated['social_links'])) {
            $updateData['social_links_json'] = $validated['social_links'];
        }

        $profile->update($updateData);

        return response()->json([
            'message' => 'Profile updated successfully',
            'profile' => $profile->fresh(),
            'completion_score' => $this->calculateCompletionScore($profile->fresh())
        ]);
    }

    public function getStats(Request $request)
    {
        $user = $request->user();
        $profile = $user->profile;

        $stats = [
            'profile_completion' => $profile ? $this->calculateCompletionScore($profile) : 0,
            'total_applications' => $user->jobApplications()->count(),
            'successful_applications' => $user->jobApplications()->where('status', 'hired')->count(),
            'portfolio_items' => $user->portfolioItems()->count(),
            'featured_portfolio' => $user->portfolioItems()->featured()->count(),
            'screening_answers' => $user->screeningAnswers()->count(),
            'job_matches' => $user->jobMatches()->count(),
            'high_quality_matches' => $user->jobMatches()->highMatch()->count(),
        ];

        // Calculate success metrics
        $totalApplications = $stats['total_applications'];
        $stats['success_rate'] = $totalApplications > 0 
            ? round(($stats['successful_applications'] / $totalApplications) * 100, 1)
            : 0;

        $stats['avg_match_score'] = $user->jobMatches()->avg('match_score') ?? 0;

        return response()->json([
            'stats' => $stats,
            'recommendations' => $this->getImprovementRecommendations($profile, $stats)
        ]);
    }

    public function getSkillSuggestions(Request $request)
    {
        $query = $request->get('q', '');
        
        // This would ideally be a curated list or pulled from a skills database
        $commonSkills = [
            'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js',
            'Python', 'Django', 'Flask', 'FastAPI', 'PHP', 'Laravel', 'Symfony',
            'Java', 'Spring Boot', 'C#', '.NET', 'Ruby', 'Ruby on Rails',
            'Go', 'Rust', 'Swift', 'Kotlin', 'Dart', 'Flutter',
            'HTML', 'CSS', 'Sass', 'Less', 'Bootstrap', 'Tailwind CSS',
            'MySQL', 'PostgreSQL', 'MongoDB', 'Redis', 'ElasticSearch',
            'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes',
            'Git', 'CI/CD', 'Jenkins', 'GitHub Actions', 'Figma', 'Adobe Creative Suite'
        ];

        $suggestions = collect($commonSkills)
            ->filter(function ($skill) use ($query) {
                return stripos($skill, $query) !== false;
            })
            ->take(10)
            ->values();

        return response()->json(['suggestions' => $suggestions]);
    }

    private function calculateCompletionScore($profile)
    {
        if (!$profile) return 0;

        $fields = [
            'default_hourly_rate' => 10,
            'weekly_availability' => 5,
            'bio' => 20,
            'skills_json' => 15,
            'languages_json' => 10,
            'timezone' => 5,
            'country' => 5,
            'specialization' => 15,
            'years_experience' => 10,
            'certifications_json' => 5,
        ];

        $score = 0;
        foreach ($fields as $field => $weight) {
            $value = $profile->$field;
            
            if (is_array($value)) {
                $score += !empty($value) ? $weight : 0;
            } else {
                $score += !empty($value) ? $weight : 0;
            }
        }

        return $score;
    }

    private function getImprovementRecommendations($profile, $stats)
    {
        $recommendations = [];

        // Profile completion recommendations
        if ($stats['profile_completion'] < 80) {
            $recommendations[] = [
                'type' => 'profile',
                'priority' => 'high',
                'message' => 'Complete your profile to increase your chances of getting matched with relevant jobs.',
                'action' => 'Complete Profile'
            ];
        }

        // Portfolio recommendations
        if ($stats['portfolio_items'] < 3) {
            $recommendations[] = [
                'type' => 'portfolio',
                'priority' => 'high',
                'message' => 'Add more portfolio items to showcase your work to potential clients.',
                'action' => 'Add Portfolio Items'
            ];
        }

        // Screening answers recommendations
        if ($stats['screening_answers'] < 10) {
            $recommendations[] = [
                'type' => 'screening',
                'priority' => 'medium',
                'message' => 'Build a library of screening question answers to speed up your application process.',
                'action' => 'Practice Screening Questions'
            ];
        }

        // Success rate recommendations
        if ($stats['success_rate'] < 10 && $stats['total_applications'] > 5) {
            $recommendations[] = [
                'type' => 'strategy',
                'priority' => 'high',
                'message' => 'Your application success rate could be improved. Consider refining your proposals.',
                'action' => 'Review Application Strategy'
            ];
        }

        return $recommendations;
    }
}