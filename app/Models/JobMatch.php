<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobMatch extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'upwork_job_id',
        'job_title',
        'job_description',
        'job_url',
        'client_name',
        'budget_type', // 'hourly' or 'fixed'
        'budget_min',
        'budget_max',
        'skills_required_json', // array of required skills
        'job_category',
        'posted_at',
        'match_score', // 1-100 AI-calculated compatibility score
        'skill_match_percentage', // % of user skills matching job requirements
        'budget_compatibility', // user rate vs job budget compatibility
        'experience_match', // does experience level align?
        'location_match', // timezone/location compatibility
        'is_dismissed', // user dismissed this job
        'is_applied', // user applied to this job
        'applied_at',
        'ai_analysis', // JSON of detailed AI analysis
        'recommendation_reason', // why this job was recommended
        'notification_sent_at', // when user was notified
        'last_updated', // when job data was last refreshed
    ];

    protected $casts = [
        'skills_required_json' => 'array',
        'budget_min' => 'decimal:2',
        'budget_max' => 'decimal:2',
        'posted_at' => 'datetime',
        'match_score' => 'integer',
        'skill_match_percentage' => 'integer',
        'budget_compatibility' => 'integer',
        'experience_match' => 'integer',
        'location_match' => 'integer',
        'is_dismissed' => 'boolean',
        'is_applied' => 'boolean',
        'applied_at' => 'datetime',
        'ai_analysis' => 'array',
        'notification_sent_at' => 'datetime',
        'last_updated' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Helper methods
    public function getSkillsRequiredAttribute(): array
    {
        return $this->skills_required_json ?? [];
    }

    public function getAiAnalysisAttribute(): array
    {
        return $this->ai_analysis ?? [];
    }

    public function isHighMatch(): bool
    {
        return $this->match_score >= 80;
    }

    public function isGoodMatch(): bool
    {
        return $this->match_score >= 60;
    }

    public function getMatchGradeAttribute(): string
    {
        return match(true) {
            $this->match_score >= 90 => 'A+',
            $this->match_score >= 80 => 'A',
            $this->match_score >= 70 => 'B+',
            $this->match_score >= 60 => 'B',
            $this->match_score >= 50 => 'C+',
            $this->match_score >= 40 => 'C',
            default => 'D'
        };
    }

    public function getMatchColorAttribute(): string
    {
        return match(true) {
            $this->match_score >= 80 => 'green',
            $this->match_score >= 60 => 'blue',
            $this->match_score >= 40 => 'yellow',
            default => 'red'
        };
    }

    // Scope methods
    public function scopeHighMatch($query)
    {
        return $query->where('match_score', '>=', 80);
    }

    public function scopeAvailable($query)
    {
        return $query->where('is_dismissed', false)->where('is_applied', false);
    }

    public function scopeRecent($query)
    {
        return $query->where('posted_at', '>=', now()->subDays(7));
    }

    public function scopeOrderedByMatch($query)
    {
        return $query->orderBy('match_score', 'desc');
    }
}
