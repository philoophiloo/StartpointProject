<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OpportunityType;

class OpportunityTypeSeeder extends Seeder
{
    public function run(): void
    {
        echo "Seeding Opportunity Types...\n";
        OpportunityType::factory()->count(4)->create();
    }
}
