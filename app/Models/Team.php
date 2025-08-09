<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Team extends Model
{
    use HasFactory;

    protected $fillable = [
        'owner_id', // user who created the team
        'name',
        'description',
        'is_active',
        'subscription_plan', // 'free', 'pro', 'enterprise'
        'max_members', // based on subscription
        'settings_json', // team preferences and configurations
        'billing_email',
        'created_at',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'settings_json' => 'array',
        'max_members' => 'integer',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function members(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_members')
            ->withPivot(['role', 'permissions_json', 'joined_at', 'is_active'])
            ->withTimestamps();
    }

    public function teamMembers(): HasMany
    {
        return $this->hasMany(TeamMember::class);
    }

    public function activeMembers(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'team_members')
            ->withPivot(['role', 'permissions_json', 'joined_at', 'is_active'])
            ->wherePivot('is_active', true)
            ->withTimestamps();
    }

    // Helper methods
    public function getSettingsAttribute(): array
    {
        return $this->settings_json ?? [];
    }

    public function isOwner(User $user): bool
    {
        return $this->owner_id === $user->id;
    }

    public function hasMember(User $user): bool
    {
        return $this->members()->where('user_id', $user->id)->exists();
    }

    public function getMemberRole(User $user): ?string
    {
        $member = $this->members()->where('user_id', $user->id)->first();
        return $member?->pivot->role;
    }

    public function canAddMoreMembers(): bool
    {
        return $this->activeMembers()->count() < $this->max_members;
    }

    public function getAvailableSlots(): int
    {
        return $this->max_members - $this->activeMembers()->count();
    }

    // Scope methods
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOwnedBy($query, User $user)
    {
        return $query->where('owner_id', $user->id);
    }
}
