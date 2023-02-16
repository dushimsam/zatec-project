<?php

namespace Tests\Unit\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     * @return void
     */
    public function testAllUsers()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/api/user');
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testGetUserById()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/api/user/'.$user->id);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }
}
