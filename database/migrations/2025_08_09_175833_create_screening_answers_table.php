<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('screening_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('question_hash')->index(); // MD5 hash for quick lookups
            $table->text('question_text');
            $table->text('answer_text');
            $table->string('job_category')->nullable()->index(); // for category-based suggestions
            $table->boolean('is_template')->default(false)->index(); // reusable answers
            $table->tinyInteger('confidence_score')->default(5); // 1-10 confidence rating
            $table->integer('times_used')->default(0); // usage tracking
            $table->timestamp('last_used_at')->nullable();
            $table->timestamps();
            
            // Composite indexes for performance
            $table->index(['user_id', 'job_category']);
            $table->index(['user_id', 'is_template']);
            $table->index(['question_hash', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('screening_answers');
    }
};
