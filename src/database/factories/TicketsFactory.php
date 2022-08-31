<?php

namespace Database\Factories;

use App\Models\Tickets;
use App\Models\User;
use Faker\Core\DateTime;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Tickets>
 */
class TicketsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->words(3, true),
            'status' => fake()->numberBetween(0, 2),
            'user_id' => User::all()->random()->id,
            'solved_at' => fake()->dateTime('now'),
            'freezed_at' => fake()->dateTime('now'),
        ];
    }
}
