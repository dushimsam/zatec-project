<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use App\Models\Song;
use Exception;
use GrahamCampbell\ResultType\Error;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;

/**
 * @class GenreController
 * @brief Controller for Genre model
 */
class GenreController extends Controller
{
    /**
     * Get list of Genres
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        // Return all genres in descending order of creation time
        $genreList = Genre::orderBy('created_at', 'desc')->get();
        return response()->json($genreList);
    }

    /**
     *  Get list of paginated Genres
     * @return JsonResponse
     */
    public function allPaginated(): JsonResponse
    {
        // Return paginated genres in descending order of creation time
        $genreList = Genre::orderBy('created_at', 'desc')->paginate(5);
        return response()->json($genreList);
    }

    /**
     * Get A single Genre
     * @param Genre $genre
     * @return JsonResponse
     */
    public function show(Genre $genre): JsonResponse
    {
        return response()->json($genre);
    }

    /**
     * Get A list of paginated Songs assigned to a Genre
     * @param Genre $genre
     * @return JsonResponse
     */
    public function songs(Genre $genre): JsonResponse
    {
        $songs = Song::where('genre_id', $genre->id)->with('album')->paginate(6);
        return response()->json($songs);
    }

    /**
     * Create a given Genre
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        // Validate request parameters
        $valid = Validator::make($request->json()->all(), [
            "type" => "required|string|min:3|max:100|unique:genres",
        ]);

        // Return error if validation fails
        if ($valid->fails()) return response()->json(['message' => Arr::first(Arr::flatten($valid->messages()->get('*')))], 400);

        try {
            // Create new genre
            $genre = Genre::query()->create([
                "type" => $request->json()->get("type")
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json(['message' => $ex->getMessage()], 501);
        }

        // Return success message and newly created genre
        return response()->json(['message' => 'Created Successfully', 'model' => $genre], 201);
    }

    /**
     * Update a given Genre's data
     * @param Request $request
     * @param Genre $genre
     * @return JsonResponse
     */
    public function update(Request $request, Genre  $genre): JsonResponse
    {

        // Validate request parameters
        $valid = Validator::make($request->json()->all(), [
            "type" => "required|string|min:3|max:100|unique:genres",
        ]);

        // Return error if validation fails
        if ($valid->fails()) return response()->json(['message' => Arr::first(Arr::flatten($valid->messages()->get('*')))], 400);
        $id = $genre->id;

        try {
            // Update the genre with the request parameters
            $genre = $genre->update([
                "type" => $request->json()->get("type")
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            // If an exception is thrown, return an error response
            return response()->json(['message' => $ex->getMessage()], 501);
        }

        return response()->json(['message' => 'Updated Successfully', 'model' => Genre::find($id)], 200);
    }

    /**
     * Delete a given Genre with associated songs
     * @param Genre $genre
     * @return JsonResponse
     */
    public function destroy(Genre $genre): JsonResponse
    {
        try {
            //First delete all songs assigned to the genre
            $genre->songs()->delete();
            // Delete the genre
            $genre->delete();

            return response()->json([
                'message' => 'Genre and all associated songs have been deleted'
            ]);
        } catch (Exception $e) {
            // If an exception is thrown, return an error response
            return response()->json($e->getMessage(), 501);
        }
    }

}
