<?php

namespace Database\Factories;

use App\Models\CompensationType;
use Illuminate\Database\Eloquent\Factories\Factory;

class CompensationTypeFactory extends Factory
{
    protected $model = CompensationType::class;

    public function definition(): array
    {
        return [
            'type' => $this->faker->randomElement([
                'Stipend',
                'Allowance',
                'Commission',
                'Salary',
                'Bonus',
            ]),
            'description' => $this->faker->optional()->sentence(),
            'is_active' => true,
            'created_by' => 'system',
        ];
    }
}
