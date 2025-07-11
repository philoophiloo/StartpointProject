<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cohort;

class CohortSeeder extends Seeder
{
    public function run(): void
    {
        echo "Seeding Cohorts...\n";
        Cohort::factory()->count(10)->create();
    }
}
