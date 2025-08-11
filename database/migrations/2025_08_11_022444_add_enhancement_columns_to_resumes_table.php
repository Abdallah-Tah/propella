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
            $table->timestamp('last_downloaded_at')->nullable()->after('last_used_at');
            $table->string('enhancement_status')->nullable()->after('last_downloaded_at'); // processing, completed, failed
            $table->timestamp('enhancement_started_at')->nullable()->after('enhancement_status');
            $table->timestamp('enhancement_completed_at')->nullable()->after('enhancement_started_at');
            $table->text('enhancement_error')->nullable()->after('enhancement_completed_at');
            $table->json('enhancement_results')->nullable()->after('enhancement_error');

            // Add index for frequently queried columns
            $table->index(['user_id', 'enhancement_status']);
            $table->index('last_downloaded_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->dropIndex(['user_id', 'enhancement_status']);
            $table->dropIndex(['last_downloaded_at']);

            $table->dropColumn([
                'last_downloaded_at',
                'enhancement_status',
                'enhancement_started_at',
                'enhancement_completed_at',
                'enhancement_error',
                'enhancement_results'
            ]);
        });
    }
};
