<?php

namespace Tests\Unit\Controllers;


use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Response;
use Tests\TestCase;
use App\Models\User;
use App\Models\Album;

class AlbumControllerTest extends TestCase
{
    use RefreshDatabase;

    /**
     * @test
     * @return void
     */
    public function testAllAlbums()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/api/album');
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testAllAlbumsPaginated()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get('/api/album/paginated');
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testGetAlbumById()
    {
        $user = User::factory()->create();
        $album = Album::factory()->create();
        $response = $this->actingAs($user)->get('/api/album/'.$album->id);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testGetAlbumSongs()
    {
        $user = User::factory()->create();
        $album = Album::factory()->create();
        $response = $this->actingAs($user)->get('/api/album/'.$album->id.'/songs');
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testCreateAlbum()
    {
        $user = User::factory()->create();
        $album = Album::factory()->make();
        $response = $this->actingAs($user)->post('/api/album', $album->toArray());
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testUpdateAlbum()
    {
        $user = User::factory()->create();
        $album = Album::factory()->create();
        $updatedAlbum = Album::factory()->make();
        $response = $this->actingAs($user)->put('/api/album/'.$album->id, $updatedAlbum->toArray());
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }

    /**
     * @test
     * @return void
     */
    public function testDeleteAlbum()
    {
        $user = User::factory()->create();
        $album = Album::factory()->create();
        $response = $this->actingAs($user)->delete('/api/album/'.$album->id);
        $response->assertStatus(Response::HTTP_OK);
        $this->assertNotEmpty($response->getContent());
    }
}
