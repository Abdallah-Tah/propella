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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->decimal('default_hourly_rate', 8, 2)->nullable();
            $table->integer('weekly_availability')->nullable(); // hours per week
            $table->text('bio')->nullable();
            $table->json('skills_json')->nullable(); // array of skills
            $table->json('languages_json')->nullable(); // array of languages with proficiency
            $table->json('certifications_json')->nullable(); // array of certifications
            $table->json('portfolio_links_json')->nullable(); // array of portfolio URLs
            $table->json('social_links_json')->nullable(); // LinkedIn, GitHub, etc.
            $table->string('timezone')->nullable();
            $table->string('country')->nullable();
            $table->boolean('is_available')->default(true);
            $table->text('specialization')->nullable(); // main area of expertise
            $table->integer('years_experience')->nullable();
            $table->timestamps();
            
            $table->unique('user_id'); // One profile per user
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
