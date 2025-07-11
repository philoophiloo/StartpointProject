<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\OpportunityUser;

class OpportunityUserSeeder extends Seeder
{
    public function run(): void
    {
        OpportunityUser::factory()->count(10)->create();
    }
}
