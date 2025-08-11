<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->string('enhanced_file_path')->nullable()->after('file_path');
            $table->longText('enhanced_text')->nullable()->after('extracted_text');
        });
    }

    public function down(): void
    {
        Schema::table('resumes', function (Blueprint $table) {
            $table->dropColumn(['enhanced_file_path', 'enhanced_text']);
        });
    }
};
