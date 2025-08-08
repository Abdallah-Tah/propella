<?php

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ResumeController;
use App\Http\Controllers\ProposalController;
use App\Http\Controllers\ProposalHistoryController;
use App\Http\Controllers\Settings\ProfileController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function (Request $request) {
        $user = $request->user();

        // Get real stats
        $stats = [
            'totalProposals' => $user->generations()->count(),
            'thisWeek' => $user->generations()->where('created_at', '>=', now()->subWeek())->count(),
            'resumeCount' => $user->resumes()->count(),
            'avgResponseTime' => 'N/A'
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

        return Inertia::render('dashboard-enhanced', [
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

    Route::post('/api/proposals/generate', [ProposalController::class, 'generate']);
    Route::post('/api/proposals/generate-async', [ProposalController::class, 'generateAsync']);

    Route::get('/proposals/history', [ProposalHistoryController::class, 'index'])->name('proposals.history');
    Route::get('/proposals/{id}', [ProposalHistoryController::class, 'show'])->name('proposals.show');

    // Resume Management
    Route::get('/resumes', [ResumeController::class, 'index'])->name('resume.index');
    Route::post('/resumes', [ResumeController::class, 'store'])->name('resume.store');
    Route::delete('/resumes/{resume}', [ResumeController::class, 'destroy'])->name('resume.destroy');

    // Horizon Dashboard (protected by auth)
    Route::view('/horizon', 'horizon::layout')->middleware('auth');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
