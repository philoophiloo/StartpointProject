<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Document;

class DocumentSeeder extends Seeder
{
    public function run(): void
    {
        echo "Seeding Documents...\n";
        Document::factory()->count(10)->create();
    }
}
