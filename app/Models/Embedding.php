<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Embedding extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'source_type', 'source_id', 'position', 'metadata_json',
    ];

    protected $casts = [
        'metadata_json' => 'array',
    ];
}
