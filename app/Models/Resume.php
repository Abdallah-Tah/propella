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
        'processed_at',
        'is_default',
        'processing_status',
        'is_ai_generated',
        'download_count',
        'last_used_at',
        'last_downloaded_at',
        'enhancement_status',
        'enhancement_started_at',
        'enhancement_completed_at',
        'enhancement_error',
        'enhancement_results'
    ];

    protected $casts = [
        'metadata_json' => 'array',
        'is_processed' => 'boolean',
        'processed_at' => 'datetime',
        'is_default' => 'boolean',
        'is_ai_generated' => 'boolean',
        'download_count' => 'integer',
        'last_used_at' => 'datetime',
        'last_downloaded_at' => 'datetime',
        'enhancement_started_at' => 'datetime',
        'enhancement_completed_at' => 'datetime',
        'enhancement_results' => 'array'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function embeddings(): HasMany
    {
        return $this->hasMany(Embedding::class);
    }

    /**
     * Set this resume as the default for the user
     */
    public function setAsDefault(): void
    {
        // First, unset all other resumes as default for this user
        static::where('user_id', $this->user_id)
            ->where('id', '!=', $this->id)
            ->update(['is_default' => false]);

        // Set this resume as default
        $this->update(['is_default' => true]);
    }

    /**
     * Get the default resume for a user
     */
    public static function getDefault(int $userId): ?self
    {
        return static::where('user_id', $userId)
            ->where('is_default', true)
            ->first();
    }

    /**
     * Update the last used timestamp
     */
    public function markAsUsed(): void
    {
        $this->update(['last_used_at' => now()]);
    }

    /**
     * Increment the download count
     */
    public function incrementDownloadCount(): void
    {
        $this->increment('download_count');
    }

    /**
     * Format file size for display
     */
    public function getFormattedFileSizeAttribute(): string
    {
        $bytes = $this->file_size;
        if ($bytes === 0) return '0 Bytes';

        $k = 1024;
        $sizes = ['Bytes', 'KB', 'MB', 'GB'];
        $i = floor(log($bytes) / log($k));

        return round($bytes / pow($k, $i), 2) . ' ' . $sizes[$i];
    }

    /**
     * Check if resume processing is complete
     */
    public function isReady(): bool
    {
        return $this->processing_status === 'ready';
    }

    /**
     * Check if resume is currently processing
     */
    public function isProcessing(): bool
    {
        return $this->processing_status === 'processing';
    }

    /**
     * Check if resume processing failed
     */
    public function hasFailed(): bool
    {
        return $this->processing_status === 'failed';
    }
}
