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
         Schema::create('compensation_types', function (Blueprint $table) {
            $table->id();
            $table->string('type', 255);
            $table->text('description')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('created_by', 200)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
