<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeamMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'team_id',
        'user_id',
        'role', // 'owner', 'admin', 'member', 'viewer'
        'permissions_json', // specific permissions for this member
        'joined_at',
        'is_active',
        'invited_by', // user_id who sent the invitation
        'invitation_accepted_at',
    ];

    protected $casts = [
        'permissions_json' => 'array',
        'joined_at' => 'datetime',
        'is_active' => 'boolean',
        'invitation_accepted_at' => 'datetime',
    ];

    public function team(): BelongsTo
    {
        return $this->belongsTo(Team::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function invitedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'invited_by');
    }

    // Helper methods
    public function getPermissionsAttribute(): array
    {
        return $this->permissions_json ?? [];
    }

    public function hasPermission(string $permission): bool
    {
        $permissions = $this->getPermissionsAttribute();
        return in_array($permission, $permissions) || $this->isOwnerOrAdmin();
    }

    public function isOwner(): bool
    {
        return $this->role === 'owner';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isOwnerOrAdmin(): bool
    {
        return in_array($this->role, ['owner', 'admin']);
    }

    public function canManageTeam(): bool
    {
        return $this->isOwnerOrAdmin() || $this->hasPermission('manage_team');
    }

    public function canInviteMembers(): bool
    {
        return $this->isOwnerOrAdmin() || $this->hasPermission('invite_members');
    }

    public function canViewProposals(): bool
    {
        return $this->isOwnerOrAdmin() || $this->hasPermission('view_proposals');
    }

    public function canCreateProposals(): bool
    {
        return $this->isOwnerOrAdmin() || $this->hasPermission('create_proposals');
    }

    // Scope methods
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeByRole($query, string $role)
    {
        return $query->where('role', $role);
    }

    public function scopeAdmins($query)
    {
        return $query->whereIn('role', ['owner', 'admin']);
    }
}
