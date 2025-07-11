<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Opportunity;

class OpportunitySeeder extends Seeder
{
    public function run(): void
    {
        echo "Seeding Opportunities...\n";
        Opportunity::factory()->count(10)->create();
    }
}
