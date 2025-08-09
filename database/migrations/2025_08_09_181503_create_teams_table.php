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
        Schema::create('teams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('users')->cascadeOnDelete();
            $table->string('name');
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->enum('subscription_plan', ['free', 'pro', 'enterprise'])->default('free');
            $table->integer('max_members')->default(5); // based on subscription plan
            $table->json('settings_json')->nullable(); // team preferences and configurations
            $table->string('billing_email')->nullable();
            $table->timestamps();

            // Indexes for performance
            $table->index('owner_id');
            $table->index('is_active');
            $table->index('subscription_plan');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teams');
    }
};
