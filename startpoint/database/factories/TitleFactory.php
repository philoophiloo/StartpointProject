<?php

namespace Database\Factories;

use App\Models\Title;
use Illuminate\Database\Eloquent\Factories\Factory;

class TitleFactory extends Factory
{
    protected $model = Title::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->jobTitle,
            'description' => $this->faker->optional()->sentence(),
            'is_active' => true,
            'created_by' => 'system',
        ];
    }
}
