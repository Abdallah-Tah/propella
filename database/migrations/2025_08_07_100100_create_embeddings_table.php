<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('embeddings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('source_type'); // e.g., resume, profile
            $table->string('source_id');   // id or hash
            $table->unsignedSmallInteger('position')->default(0);
            $table->jsonb('metadata_json')->nullable();
            $table->timestamps();
        });

        if (config('database.default') === 'pgsql') {
            // 1536 dims matches text-embedding-3-small
            DB::statement('ALTER TABLE embeddings ADD COLUMN embedding vector(1536);');
            DB::statement('CREATE INDEX embeddings_embedding_idx ON embeddings USING ivfflat (embedding vector_cosine_ops);');
            DB::statement('CREATE INDEX embeddings_user_idx ON embeddings (user_id);');
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('embeddings');
    }
};
