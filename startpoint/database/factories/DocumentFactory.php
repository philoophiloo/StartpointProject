<?php

namespace Database\Factories;

use App\Models\Document;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class DocumentFactory extends Factory
{
    protected $model = Document::class;

    public function definition(): array
    {
        $fileName = $this->faker->word . '.pdf';

        return [
            'user_id' => User::factory(), // Create or associate with a user
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->optional()->paragraph(),
            'file_path' => 'uploads/documents/' . $fileName,
            'file_name' => $fileName,
            'file_extension' => 'pdf',
            'file_size_in_kilobytes' => $this->faker->randomFloat(2, 50, 500),
            'is_active' => true,
            'created_by' => 'system',
        ];
    }
}
