<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Title;

class TitleSeeder extends Seeder
{
    public function run(): void
    {
        echo "Seeding Titles...\n";
        Title::factory()->count(10)->create();
    }
}
