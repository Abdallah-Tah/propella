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
        Schema::create('job_matches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('upwork_job_id')->unique(); // Upwork's job identifier
            $table->string('job_title');
            $table->longText('job_description');
            $table->text('job_url');
            $table->string('client_name')->nullable();
            $table->enum('budget_type', ['hourly', 'fixed'])->default('hourly');
            $table->decimal('budget_min', 10, 2)->nullable();
            $table->decimal('budget_max', 10, 2)->nullable();
            $table->json('skills_required_json')->nullable(); // required skills array
            $table->string('job_category')->index();
            $table->timestamp('posted_at');
            $table->tinyInteger('match_score')->default(0)->index(); // 1-100
            $table->tinyInteger('skill_match_percentage')->default(0); // skill alignment %
            $table->tinyInteger('budget_compatibility')->default(0); // budget compatibility %
            $table->tinyInteger('experience_match')->default(0); // experience level match %
            $table->tinyInteger('location_match')->default(0); // location/timezone match %
            $table->boolean('is_dismissed')->default(false)->index();
            $table->boolean('is_applied')->default(false)->index();
            $table->timestamp('applied_at')->nullable();
            $table->json('ai_analysis')->nullable(); // detailed AI matching analysis
            $table->text('recommendation_reason')->nullable(); // human-readable recommendation
            $table->timestamp('notification_sent_at')->nullable();
            $table->timestamp('last_updated')->nullable(); // job data refresh timestamp
            $table->timestamps();

            // Performance indexes
            $table->index(['user_id', 'match_score']);
            $table->index(['user_id', 'is_dismissed', 'is_applied']);
            $table->index(['user_id', 'job_category']);
            $table->index(['posted_at', 'match_score']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_matches');
    }
};
