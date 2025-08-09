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
        Schema::create('job_applications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->text('job_url');
            $table->string('job_title');
            $table->string('client_name')->nullable();
            $table->longText('job_description');
            $table->enum('budget_type', ['hourly', 'fixed'])->default('hourly');
            $table->decimal('budget_min', 10, 2)->nullable();
            $table->decimal('budget_max', 10, 2)->nullable();
            $table->longText('proposal_text');
            $table->longText('cover_letter')->nullable();
            $table->decimal('bid_amount', 10, 2);
            $table->string('timeline_estimate')->nullable();
            $table->json('screening_questions_json')->nullable(); // Q&A pairs
            $table->json('attachments_json')->nullable(); // file paths/URLs  
            $table->enum('status', ['draft', 'submitted', 'interview', 'hired', 'declined', 'withdrawn'])->default('draft');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('response_received_at')->nullable();
            $table->longText('client_response')->nullable();
            $table->timestamp('interview_scheduled_at')->nullable();
            $table->timestamp('hired_at')->nullable();
            $table->tinyInteger('success_score')->nullable(); // 1-10 for learning
            $table->longText('notes')->nullable();
            $table->string('upwork_job_id')->nullable()->index(); // Chrome extension integration
            $table->boolean('auto_filled')->default(false); // AI assistance tracking
            $table->timestamps();

            // Indexes for performance
            $table->index(['user_id', 'status']);
            $table->index(['user_id', 'created_at']);
            $table->index('submitted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_applications');
    }
};
