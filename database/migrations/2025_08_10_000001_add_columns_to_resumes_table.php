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
        Schema::table('resumes', function (Blueprint $table) {
            $table->boolean('is_default')->default(false)->after('processed_at'); // Default resume flag
            $table->enum('processing_status', ['processing', 'ready', 'failed'])->default('processing')->after('is_default'); // Processing status
            $table->boolean('is_ai_generated')->default(false)->after('processing_status'); // AI-generated flag
            $table->integer('download_count')->default(0)->after('is_ai_generated'); // Download count
            $table->timestamp('last_used_at')->nullable()->after('download_count'); // Last used timestamp
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->dropColumn(['is_default', 'processing_status', 'is_ai_generated', 'download_count', 'last_used_at']);
        });
    }
};
