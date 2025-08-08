<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Embedding extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'resume_id',
        'chunk_text',
        'chunk_index',
        'embedding',
        'metadata_json',
    ];

    protected $casts = [
        'metadata_json' => 'array',
        'embedding' => 'array',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function resume()
    {
        return $this->belongsTo(Resume::class);
    }
}
