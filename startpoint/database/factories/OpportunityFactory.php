<?php

namespace Database\Factories;

use App\Models\Opportunity;
use Illuminate\Database\Eloquent\Factories\Factory;

class OpportunityFactory extends Factory
{
    protected $model = Opportunity::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle,
            'department' => $this->faker->randomElement(['ICT', 'Finance', 'HR', 'Marketing']),
            'opportunity_type' => $this->faker->randomElement(['Internship', 'Attachment', 'Graduate Trainee']),
            'opportunity_description' => $this->faker->paragraph,
            'core_competencies' => $this->faker->sentence(10),
            'compensation_type' => $this->faker->randomElement(['Stipend', 'Allowance', 'None']),
            'compensation_currency' => $this->faker->randomElement(['KES', 'USD']),
            'compensation_amount' => $this->faker->randomFloat(2, 1000, 10000),
            'expiry_date' => $this->faker->dateTimeBetween('now', '+6 months')->format('Y-m-d'),
            'is_active' => true,
            'created_by' => 'system',
        ];
    }
}
