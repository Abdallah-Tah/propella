<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PortfolioItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'category', // 'web-development', 'mobile-app', 'design', etc.
        'skills_used_json', // array of skills demonstrated
        'project_url',
        'github_url',
        'image_urls_json', // screenshots/images
        'client_name',
        'project_duration', // in days
        'budget_range',
        'completion_date',
        'is_featured', // highlight best work
        'is_public', // show to potential clients
        'upwork_project_id', // link to Upwork if applicable
        'testimonial', // client feedback
        'outcome_metrics', // "Increased conversion by 25%"
        'challenges_solved', // technical problems overcome
        'technologies_json', // specific tools/frameworks used
        'sort_order', // for manual ordering
    ];

    protected $casts = [
        'skills_used_json' => 'array',
        'image_urls_json' => 'array',
        'technologies_json' => 'array',
        'completion_date' => 'date',
        'is_featured' => 'boolean',
        'is_public' => 'boolean',
        'project_duration' => 'integer',
        'sort_order' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Helper methods
    public function getSkillsUsedAttribute(): array
    {
        return $this->skills_used_json ?? [];
    }

    public function getImageUrlsAttribute(): array
    {
        return $this->image_urls_json ?? [];
    }

    public function getTechnologiesAttribute(): array
    {
        return $this->technologies_json ?? [];
    }

    public function getFirstImageAttribute(): ?string
    {
        $images = $this->getImageUrlsAttribute();
        return $images[0] ?? null;
    }

    // Scope methods
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('completion_date', 'desc');
    }
}
