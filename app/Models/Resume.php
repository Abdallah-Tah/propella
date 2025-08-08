<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Resume extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'original_name',
        'file_path',
        'file_type',
        'file_size',
        'extracted_text',
        'metadata_json',
        'is_processed',
        'processed_at'
    ];

    protected $casts = [
        'metadata_json' => 'array',
        'is_processed' => 'boolean',
        'processed_at' => 'datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function embeddings(): HasMany
    {
        return $this->hasMany(Embedding::class);
    }
}
