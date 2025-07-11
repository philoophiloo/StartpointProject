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
        Schema::create('opportunities', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->string('department', 255);          
            $table->string('opportunity_type', 255)->nullable();  
            $table->text('opportunity_description')->nullable();
            $table->text('core_competencies')->nullable();
            $table->string('compensation_type', 255)->nullable();  
            $table->string('compensation_currency', 255)->nullable();
            $table->float('compensation_amount');
            $table->date('expiry_date');
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
