<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_url',
        'job_title',
        'client_name',
        'job_description',
        'budget_type', // 'hourly' or 'fixed'
        'budget_min',
        'budget_max',
        'proposal_text',
        'cover_letter',
        'bid_amount',
        'timeline_estimate',
        'screening_questions_json', // Q&A pairs
        'attachments_json', // file paths/URLs
        'status', // 'draft', 'submitted', 'interview', 'hired', 'declined', 'withdrawn'
        'submitted_at',
        'response_received_at',
        'client_response',
        'interview_scheduled_at',
        'hired_at',
        'success_score', // 1-10 rating for learning
        'notes',
        'upwork_job_id', // for Chrome extension integration
        'auto_filled', // was this auto-filled by our system?
    ];

    protected $casts = [
        'screening_questions_json' => 'array',
        'attachments_json' => 'array',
        'budget_min' => 'decimal:2',
        'budget_max' => 'decimal:2',
        'bid_amount' => 'decimal:2',
        'submitted_at' => 'datetime',
        'response_received_at' => 'datetime',
        'interview_scheduled_at' => 'datetime',
        'hired_at' => 'datetime',
        'auto_filled' => 'boolean',
        'success_score' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Helper methods
    public function getScreeningQuestionsAttribute(): array
    {
        return $this->screening_questions_json ?? [];
    }

    public function getAttachmentsAttribute(): array
    {
        return $this->attachments_json ?? [];
    }

    public function isActive(): bool
    {
        return in_array($this->status, ['submitted', 'interview']);
    }

    public function isSuccessful(): bool
    {
        return $this->status === 'hired';
    }

    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'draft' => 'gray',
            'submitted' => 'blue',
            'interview' => 'yellow',
            'hired' => 'green',
            'declined' => 'red',
            'withdrawn' => 'gray',
            default => 'gray'
        };
    }
}
