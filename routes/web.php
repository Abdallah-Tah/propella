<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\ProposalHistoryController;
use App\Http\Controllers\Settings\ProfileController;

Route::get('/', function () {
    return Inertia::render('welcome-spectacular');
})->name('welcome');

// Marketing Pages
Route::get('/about', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/services', function () {
    return Inertia::render('services');
})->name('services');

Route::get('/terms', function () {
    return Inertia::render('terms');
})->name('terms');

Route::get('/privacy', function () {
    return Inertia::render('privacy');
})->name('privacy');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

Route::post('/contact', [App\Http\Controllers\ContactController::class, 'submit'])->name('contact.submit');

// Public API routes (no auth required)
Route::get('/api/portfolio/public/{userId}', [App\Http\Controllers\PortfolioController::class, 'getPublicPortfolio']);

// Legacy home route redirect
Route::get('/home', function () {
    return redirect()->route('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function (Request $request) {
        $user = $request->user();

        // Get real stats
        $stats = [
            'totalProposals' => $user->generations()->count(),
            'thisWeek' => $user->generations()->where('created_at', '>=', now()->subWeek())->count(),
            'winRate' => 0, // TODO: Calculate based on success metrics
            'avgResponseTime' => 'N/A',
            'resumes' => $user->resumes()->count(),
            'proposals_generated' => $user->generations()->count(),
            'proposals_this_month' => $user->generations()->where('created_at', '>=', now()->subMonth())->count(),
        ];

        // Get recent proposals
        $recentProposals = $user->generations()
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($generation) {
                return [
                    'id' => $generation->id,
                    'title' => $generation->source_json['title'] ?? 'Untitled Job',
                    'date' => $generation->created_at->diffForHumans(),
                    'status' => $generation->status === 'success' ? 'sent' : 'draft'
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentProposals' => $recentProposals
        ]);
    })->name('dashboard');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Proposals
    Route::get('/proposals', function () {
        return Inertia::render('proposals/enhanced');
    })->name('proposals.index');

    Route::get('/proposals/workflow', function () {
        return Inertia::render('proposals/enhanced-workflow');
    })->name('proposals.workflow');

    Route::get('/job-matches', function () {
        return Inertia::render('job-matches');
    })->name('job-matches');

    Route::get('/portfolio', function () {
        return Inertia::render('portfolio-management');
    })->name('portfolio');

    Route::get('/profile/wizard', function () {
        return Inertia::render('profile-wizard');
    })->name('profile.wizard');

    // Enhanced Proposal API
    Route::post('/api/proposals/generate', [ProposalController::class, 'generate']);
    Route::post('/api/proposals/generate-async', [ProposalController::class, 'generateAsync']);
    Route::post('/api/applications', [ProposalController::class, 'saveApplication']);
    Route::put('/api/applications/{application}/submit', [ProposalController::class, 'submitApplication']);
    Route::get('/api/applications', [ProposalController::class, 'getApplications']);

    Route::get('/proposals/history', [ProposalHistoryController::class, 'index'])->name('proposals.history');
    Route::get('/proposals/{id}', [ProposalHistoryController::class, 'show'])->name('proposals.show');

    // Job Matching API
    Route::prefix('api/job-matches')->group(function () {
        Route::get('/', [App\Http\Controllers\JobMatchController::class, 'index']);
        Route::get('/recommendations', [App\Http\Controllers\JobMatchController::class, 'getRecommendations']);
        Route::get('/{jobMatch}', [App\Http\Controllers\JobMatchController::class, 'show']);
        Route::put('/{jobMatch}/dismiss', [App\Http\Controllers\JobMatchController::class, 'dismiss']);
        Route::post('/{jobMatch}/apply', [App\Http\Controllers\JobMatchController::class, 'applyToJob']);
        Route::put('/preferences', [App\Http\Controllers\JobMatchController::class, 'updatePreferences']);
    });

    // Portfolio Management API
    Route::prefix('api/portfolio')->group(function () {
        Route::get('/', [App\Http\Controllers\PortfolioController::class, 'index']);
        Route::post('/', [App\Http\Controllers\PortfolioController::class, 'store']);
        Route::get('/{portfolioItem}', [App\Http\Controllers\PortfolioController::class, 'show']);
        Route::put('/{portfolioItem}', [App\Http\Controllers\PortfolioController::class, 'update']);
        Route::delete('/{portfolioItem}', [App\Http\Controllers\PortfolioController::class, 'destroy']);
        Route::put('/order', [App\Http\Controllers\PortfolioController::class, 'updateOrder']);
    });

    // Profile Management API
    Route::prefix('api/profile')->group(function () {
        Route::get('/', [App\Http\Controllers\ProfileManagementController::class, 'show']);
        Route::post('/', [App\Http\Controllers\ProfileManagementController::class, 'store']);
        Route::put('/', [App\Http\Controllers\ProfileManagementController::class, 'update']);
        Route::get('/stats', [App\Http\Controllers\ProfileManagementController::class, 'getStats']);
        Route::get('/skills/suggestions', [App\Http\Controllers\ProfileManagementController::class, 'getSkillSuggestions']);
    });

    // Resume Management
    Route::get('/resumes', [ResumeController::class, 'index'])->name('resume.index');
    Route::post('/resumes', [ResumeController::class, 'store'])->name('resume.store');
    Route::delete('/resumes/{resume}', [ResumeController::class, 'destroy'])->name('resume.destroy');

    // Horizon Dashboard (protected by auth)
    Route::view('/horizon', 'horizon::layout')->middleware('auth');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
