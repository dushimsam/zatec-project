<?php

namespace Database\Factories;

use App\Models\Song;
use Illuminate\Database\Eloquent\Factories\Factory;

class SongFactory extends Factory
{
    protected $model = Song::class;
    public function definition()
    {
        return [
            'title' => $this->faker->unique()->title(),
            'album_id' => $this->faker->randomNumber(),
            'genre_id' => $this->faker->randomNumber(),
            'length' => $this->faker->randomNumber(),
        ];
    }
}
