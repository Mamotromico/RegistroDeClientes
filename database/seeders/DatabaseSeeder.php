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
                'email' => env('DEFAULT_USER_EMAIL'),
                'name' => env('DEFAULT_USER_NAME'),
                'password' => bcrypt(env('DEFAULT_USER_PASSWORD')),
            ]
        );

        $this->call([
            ClientSeeder::class,
        ]);
    }
}
