<?php

namespace App\Http\Controllers;

use App\Models\Generation;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProposalHistoryController extends Controller
{
    public function index(Request $request)
    {
        $generations = Generation::where('user_id', $request->user()->id)
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        // Format data for the frontend component
        $formattedGenerations = $generations->map(function ($generation) {
            return [
                'id' => $generation->id,
                'job_title' => $generation->source_json['title'] ?? 'Untitled Job',
                'status' => $generation->status,
                'tokens_in' => $generation->tokens_in,
                'tokens_out' => $generation->tokens_out,
                'created_at' => $generation->created_at->format('M j, Y at g:i A'),
                'excerpt' => Str::limit($generation->output_md, 150, '...')
            ];
        });

        return Inertia::render('proposals/history', [
            'proposals' => [
                'data' => $formattedGenerations,
            ],
            'pagination' => [
                'current_page' => $generations->currentPage(),
                'last_page' => $generations->lastPage(),
                'total' => $generations->total(),
            ]
        ]);
    }

    public function show(Request $request, $id)
    {
        $generation = Generation::where('user_id', $request->user()->id)
            ->where('id', $id)
            ->firstOrFail();

        // Format the generation data for the frontend
        $formattedGeneration = [
            'id' => $generation->id,
            'job_title' => $generation->source_json['title'] ?? 'Untitled Job',
            'output_md' => $generation->output_md,
            'tokens_in' => $generation->tokens_in,
            'tokens_out' => $generation->tokens_out,
            'cost_cents' => $generation->cost_cents,
            'status' => $generation->status,
            'created_at' => $generation->created_at->format('M j, Y at g:i A'),
            'source_json' => $generation->source_json
        ];

        return Inertia::render('proposals/show', [
            'generation' => $formattedGeneration
        ]);
    }
}
