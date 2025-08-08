<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Generation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'job_hash',
        'source_json',
        'output_md',
        'tokens_in',
        'tokens_out',
        'cost_cents',
        'status',
    ];

    protected $casts = [
        'source_json' => 'array',
    ];
}
