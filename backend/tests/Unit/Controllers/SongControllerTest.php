<?php

namespace Tests\Unit\Controllers;

use App\Models\Song;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;

class SongControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     * @return void
     */
    public function testAllSong()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/api/song');
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testAllSongPaginated()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/api/song/paginated');
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testGetSongById()
    {
        $user = User::factory()->create();
        $song = Song::factory()->create();
        $response = $this->actingAs($user)->get('/api/song/' . $song->id);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }


    /**
     * @test
     * @return void
     */
    public function testCreateSong()
    {
        $user = User::factory()->create();
        $song = Song::factory()->make();
        $response = $this->actingAs($user)->post('/api/song', $song->toArray());
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testUpdateSong()
    {
        $user = User::factory()->create();
        $song = Song::factory()->create();
        $updatedSong = Song::factory()->make();
        $response = $this->actingAs($user)->put('/api/song/' . $song->id, $updatedSong->toArray());
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testDeleteSong()
    {
        $user = User::factory()->create();
        $song = Song::factory()->create();
        $response = $this->actingAs($user)->delete('/api/song/' . $song->id);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }
}
