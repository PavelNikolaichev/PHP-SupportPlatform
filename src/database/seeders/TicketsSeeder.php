<?php

namespace Database\Seeders;

use App\Models\Tickets;
use Illuminate\Database\Seeder;

class TicketsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // setStatusAttribute() method is conflicting with seeder, bear in mind!
//        Tickets::factory(10)->create();
    }
}
