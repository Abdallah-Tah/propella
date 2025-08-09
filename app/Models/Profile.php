<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'default_hourly_rate',
        'weekly_availability',
        'bio',
        'skills_json',
        'languages_json', 
        'certifications_json',
        'portfolio_links_json',
        'social_links_json',
        'timezone',
        'country',
        'is_available',
        'specialization',
        'years_experience',
    ];

    protected $casts = [
        'skills_json' => 'array',
        'languages_json' => 'array',
        'certifications_json' => 'array',
        'portfolio_links_json' => 'array',
        'social_links_json' => 'array',
        'default_hourly_rate' => 'decimal:2',
        'is_available' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Helper methods
    public function getSkillsAttribute(): array
    {
        return $this->skills_json ?? [];
    }

    public function getLanguagesAttribute(): array
    {
        return $this->languages_json ?? [];
    }

    public function getCertificationsAttribute(): array
    {
        return $this->certifications_json ?? [];
    }

    public function getPortfolioLinksAttribute(): array
    {
        return $this->portfolio_links_json ?? [];
    }

    public function getSocialLinksAttribute(): array
    {
        return $this->social_links_json ?? [];
    }
}
