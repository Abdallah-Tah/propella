<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ScreeningAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'question_hash', // MD5 hash of question for quick lookup
        'question_text',
        'answer_text',
        'job_category', // e.g., 'web-development', 'graphic-design'
        'is_template', // if this can be reused for similar questions
        'confidence_score', // 1-10 how confident user is in this answer
        'times_used', // track usage for improvement
        'last_used_at',
    ];

    protected $casts = [
        'is_template' => 'boolean',
        'times_used' => 'integer',
        'confidence_score' => 'integer',
        'last_used_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Helper method to find similar questions
    public static function findSimilarQuestions(string $questionText, int $userId): array
    {
        // This would use vector similarity search in production
        return self::where('user_id', $userId)
            ->where('question_text', 'LIKE', '%' . substr($questionText, 0, 50) . '%')
            ->orderBy('confidence_score', 'desc')
            ->orderBy('times_used', 'desc')
            ->limit(3)
            ->get()
            ->toArray();
    }

    // Update usage statistics
    public function markAsUsed(): void
    {
        $this->increment('times_used');
        $this->update(['last_used_at' => now()]);
    }
}
