<?php

namespace Database\Factories;

use App\Models\Cohort;
use Illuminate\Database\Eloquent\Factories\Factory;

class CohortFactory extends Factory
{
    protected $model = Cohort::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-2 years', 'now');
        $end = $this->faker->boolean(80) ? $this->faker->dateTimeBetween($start, '+1 year') : null;

        return [
            'name' => 'Cohort ' . $this->faker->year,
            'code_name' => strtoupper('CH-' . $this->faker->unique()->bothify('??##')),
            'president' => $this->faker->name,
            'start_date' => $start->format('Y-m-d'),
            'end_date' => $end?->format('Y-m-d'),
            'is_active' => $end === null,
            'created_by' => 'system',
        ];
    }
}
