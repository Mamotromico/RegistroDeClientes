<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        User::firstOrCreate([
                'email' => 'mamo@mamo.com',
                'name' => 'mamo',
                'password' => bcrypt('mamo'),
            ]
        );

        $this->call([
            ClientSeeder::class,
        ]);
    }
}
