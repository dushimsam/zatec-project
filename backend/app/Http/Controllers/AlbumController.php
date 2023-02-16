<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Models\Song;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


/**
 * @class AlbumController
 * @brief Controller for Album model
 */
class AlbumController extends Controller
{

    /**
     * Get list of Albums
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        // Return all albums in descending order of creation time
        $albumList = Album::orderBy('created_at', 'desc')->get();
        return response()->json($albumList);
    }

    /**
     * Get list of paginated Albums
     *
     * @return JsonResponse
     */
    public function allPaginated(): JsonResponse
    {
        // Return paginated albums in descending order of creation time
        $albumList = Album::select("*")
            ->where("status", 1)
            ->orderBy("created_at", "desc")
            ->paginate(3);

        return response()->json($albumList);
    }

    /**
     * Get A single Album
     *
     * @param Album $album
     * @return JsonResponse
     */
    public function show(Album $album): JsonResponse
    {
        return response()->json($album);
    }

    /**
     * Get A list of paginated Songs assigned to an Album
     *
     * @param Album $album
     * @return JsonResponse
     */
    public function songs(Album $album): JsonResponse
    {
        //Return paginated songs and their genre whose album matches.
        $songs = Song::where('album_id', $album->id)->with('genre')->paginate(6);
        return response()->json($songs);
    }

    /**
     * Create a given album
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        // Validate request parameters
        $valid = Validator::make($request->json()->all(), [
            "title" => "required|string|min:2|max:100|unique:albums",
            "description" => "required|string|min:3|max:200",
            "release_date" => "required|date"
        ]);

        // Return error if validation fails
        if ($valid->fails()) return response()->json(['message' => Arr::first(Arr::flatten($valid->messages()->get('*')))], 400);

        try {
            // Create new album
            $alubm = Album::query()->create([
                "title" => $request->json()->get("title"),
                "description" => $request->json()->get("description"),
                "release_date" => $request->json()->get("release_date")
            ]);
        } catch (\Illuminate\Database\QueryException $ex) {
            return response()->json(['message' => $ex->getMessage()], 501);
        }

        // Return success message and newly created album
        return response()->json(['message' => 'Created Successfully', 'model' => $alubm], 201);
    }

    /**
     * Assign the cover-image to a given Album
     * @param Request $request
     * @param Album $album
     * @return JsonResponse
     */
    public function uploadImage(Request $request, Album $album)
    {
        // Validate request parameters
        $valid = Validator::make($request->json()->all(), [
            "cover_image_url" => "required|string"
        ]);

        // Return error if validation fails
        if ($valid->fails()) return response()->json(['message' => Arr::first(Arr::flatten($valid->messages()->get('*')))], 400);

        try {
            // Set the Album's cover_image_url and it's status to 1
            Album::where('id', $album->id)->update(array('cover_image_url' => $request->json()->get("cover_image_url"), 'status' => 1));
        }catch (Exception $e) {
            // If an exception is thrown, return an error response
            return response()->json($e->getMessage(), 501);
        }
        return response()->json(['message' => 'Created Successfully', 'model' => Album::find($album->id)], 201);
    }

    /**
     * Update a given Album's data
     * @param Request $request
     * @param Album $album
     * @return JsonResponse
     */
    public function update(Request $request, Album $album): JsonResponse
    {
        // Validate request parameters
        $valid = Validator::make($request->json()->all(), [
            "title" => [
                'required',
                Rule::unique('albums')->ignore($album->id)
            ],
            "description" => "required|string|min:3|max:200",
            "release_date" => "required|date",
            "cover_image_url" => "required|string",
        ]);

        // Return error if validation fails
        if ($valid->fails()) return response()->json(['message' => Arr::first(Arr::flatten($valid->messages()->get('*')))], 400);

        try {
            // Update the genre with the request parameters
            Album::where('id', $album->id)->update(array('release_date' => $request->json()->get('release_date'),'description' => $request->json()->get('description'),'title' => $request->json()->get("title"),'cover_image_url' => $request->json()->get("cover_image_url")));
        } catch (\Illuminate\Database\QueryException $ex) {
            // If an exception is thrown, return an error response
            return response()->json(['message' => $ex->getMessage()], 501);
        }

        return response()->json(['message' => 'Updated Successfully', 'model' => Album::find($album->id)], 201);
    }

    /**
     * Delete a given Album with associated songs
     * @param Album $album
     * @return JsonResponse
     */
    public function destroy(Album $album): JsonResponse
    {
        try {
            //First delete all songs assigned to the album
            $album->songs()->delete();
            // Delete the genre
            $album->delete();

            return response()->json([
                'message' => 'Album and all associated songs have been deleted'
            ]);
        } catch (Exception $e) {
            // If an exception is thrown, return an error response
            return response()->json($e->getMessage(), 501);
        }
    }

}
