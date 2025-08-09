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
        Schema::create('portfolio_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->longText('description');
            $table->string('category')->index(); // 'web-development', 'mobile-app', 'design', etc.
            $table->json('skills_used_json')->nullable(); // array of skills demonstrated
            $table->text('project_url')->nullable();
            $table->text('github_url')->nullable();
            $table->json('image_urls_json')->nullable(); // screenshots/images
            $table->string('client_name')->nullable();
            $table->integer('project_duration')->nullable(); // in days
            $table->string('budget_range')->nullable(); // "$5K-$10K"
            $table->date('completion_date')->nullable();
            $table->boolean('is_featured')->default(false)->index();
            $table->boolean('is_public')->default(true)->index();
            $table->string('upwork_project_id')->nullable(); // link to Upwork
            $table->longText('testimonial')->nullable(); // client feedback
            $table->text('outcome_metrics')->nullable(); // "Increased conversion by 25%"
            $table->text('challenges_solved')->nullable(); // technical problems overcome
            $table->json('technologies_json')->nullable(); // specific tools/frameworks
            $table->integer('sort_order')->default(0)->index(); // manual ordering
            $table->timestamps();

            // Indexes for performance
            $table->index(['user_id', 'category']);
            $table->index(['user_id', 'is_featured']);
            $table->index(['user_id', 'is_public']);
            $table->index(['user_id', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('portfolio_items');
    }
};
