<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function resumes()
    {
        return $this->hasMany(Resume::class);
    }

    public function generations()
    {
        return $this->hasMany(Generation::class);
    }

    // Enhanced model relationships
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function screeningAnswers()
    {
        return $this->hasMany(ScreeningAnswer::class);
    }

    public function jobApplications()
    {
        return $this->hasMany(JobApplication::class);
    }

    public function portfolioItems()
    {
        return $this->hasMany(PortfolioItem::class);
    }

    public function jobMatches()
    {
        return $this->hasMany(JobMatch::class);
    }

    // Team relationships
    public function ownedTeams()
    {
        return $this->hasMany(Team::class, 'owner_id');
    }

    public function teams()
    {
        return $this->belongsToMany(Team::class, 'team_members')
            ->withPivot(['role', 'permissions_json', 'joined_at', 'is_active'])
            ->withTimestamps();
    }

    public function activeTeams()
    {
        return $this->belongsToMany(Team::class, 'team_members')
            ->withPivot(['role', 'permissions_json', 'joined_at', 'is_active'])
            ->wherePivot('is_active', true)
            ->withTimestamps();
    }

    public function teamMemberships()
    {
        return $this->hasMany(TeamMember::class);
    }
}
