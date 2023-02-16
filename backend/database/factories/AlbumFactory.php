<?php

namespace Database\Factories;

use App\Models\Album;
use Illuminate\Database\Eloquent\Factories\Factory;

class AlbumFactory extends Factory
{
    protected $model = Album::class;

    public function definition()
    {
        return [
            'title' => $this->faker->unique()->text, // provide a default value
            'description' => $this->faker->text,
            'release_date' => $this->faker->date,
        ];
    }
}
