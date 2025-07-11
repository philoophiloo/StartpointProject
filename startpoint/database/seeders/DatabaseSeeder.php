<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Department;
use App\Models\Cohort;
use App\Models\Document;
use App\Models\Title;
use App\Models\Opportunity;
use App\Models\OpportunityType;
use App\Models\CompensationType;
use App\Models\OpportunityUser;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
     {
    //     User::factory(10)->create();

    //     User::factory()->create([
    //         'name' => 'Test User',
    //         'email_address' => 'test@example.com',
       // ]);
         $this->call([
            UserSeeder::class,
            DepartmentSeeder::class,
            CohortSeeder::class,
            DocumentSeeder::class,
            TitleSeeder::class,
            OpportunitySeeder::class,
            OpportunityTypeSeeder::class,
            CompensationTypeSeeder::class,
             OpportunityUserSeeder::class,
        ]);
    }
}
