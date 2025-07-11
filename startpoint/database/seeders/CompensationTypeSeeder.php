<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CompensationType;

class CompensationTypeSeeder extends Seeder
{
    public function run(): void
    {
        echo "Seeding Compensation Types...\n";
        CompensationType::factory()->count(5)->create();
    }
}
