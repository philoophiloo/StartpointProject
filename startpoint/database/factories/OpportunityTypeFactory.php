<?php

namespace Database\Factories;

use App\Models\OpportunityType;
use Illuminate\Database\Eloquent\Factories\Factory;

class OpportunityTypeFactory extends Factory
{
    protected $model = OpportunityType::class;

    public function definition(): array
    {
        return [
            'type' => $this->faker->unique()->randomElement([
                'Internship',
                'Attachment',
                'Graduate Trainee',
                'Apprenticeship',
            ]),
            'description' => $this->faker->optional()->sentence(),
            'is_active' => true,
            'created_by' => 'system',
        ];
    }
}
