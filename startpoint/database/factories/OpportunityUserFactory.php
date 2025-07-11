<?php

namespace Database\Factories;

use App\Models\OpportunityUser;
use App\Models\User;
use App\Models\Opportunity;
use Illuminate\Database\Eloquent\Factories\Factory;

class OpportunityUserFactory extends Factory
{
    protected $model = OpportunityUser::class;

    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'opportunity_id' => Opportunity::inRandomOrder()->value('id') ?? Opportunity::factory(),
            'is_active' => $this->faker->boolean(90),
        ];
    }
}
