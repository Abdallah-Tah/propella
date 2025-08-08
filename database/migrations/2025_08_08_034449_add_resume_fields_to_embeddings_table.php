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
        Schema::table('embeddings', function (Blueprint $table) {
            $table->foreignId('resume_id')->nullable()->constrained()->onDelete('cascade');
            $table->text('chunk_text')->nullable();
            $table->integer('chunk_index')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('embeddings', function (Blueprint $table) {
            $table->dropForeign(['resume_id']);
            $table->dropColumn(['resume_id', 'chunk_text', 'chunk_index']);
        });
    }
};
