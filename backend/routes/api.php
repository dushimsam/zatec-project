<?php

use App\Http\Controllers\AlbumController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BadRequestController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\SongController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// ==== Auth service

Route::group(["prefix" => "auth"], function () {
    Route::post("/register", [AuthController::class, "register"]);
    Route::post("/login", [AuthController::class, "login"]);
    Route::get("/self", [AuthController::class, "self"])->middleware('auth:api');
    Route::any("/{params:.*}",BadRequestController::class);
});


// ==== User service

Route::group(["prefix" => "user"], function () {
    Route::get("", [UserController::class, "all"]);
    Route::get("/{user}", [UserController::class, "show"]);
    Route::any("/{params:.*}",BadRequestController::class);
});


// ==== Album Service
Route::group(["prefix" => "album", "middleware" => "jwt.verify"], function () {
    Route::get("", [AlbumController::class, "all"]);
    Route::get("/paginated", [AlbumController::class, "allPaginated"]);
    Route::get("/{album}", [AlbumController::class, "show"]);
    Route::get("/{album}/songs", [AlbumController::class, "songs"]);
    Route::post("", [AlbumController::class, "create"]);
    Route::put("/{album}/upload", [AlbumController::class, "uploadImage"]);
    Route::put("/{album}", [AlbumController::class, "update"]);
    Route::delete("/{album}", [AlbumController::class, "destroy"]);
    Route::any("/{params:.*}",BadRequestController::class);
});


// ==== Genre Service
Route::group(["prefix" => "genre", "middleware" => "jwt.verify"], function () {
    Route::get("", [GenreController::class, "all"]);
    Route::get("/paginated", [GenreController::class, "allPaginated"]);
    Route::get("/{genre}",[GenreController::class, "show"]);
    Route::get("/{genre}/songs", [GenreController::class, "songs"]);
    Route::post("", [GenreController::class, "create"]);
    Route::put("/{genre}", [GenreController::class, "update"]);
    Route::delete("/{genre}",[GenreController::class, "destroy"]);
    Route::any("/{params:.*}",BadRequestController::class);
});

// ==== Songs Service
Route::group(["prefix" => "song", "middleware" => "jwt.verify"], function () {
    Route::get("", [SongController::class, "all"]);
    Route::get("/paginated", [SongController::class, "allPaginated"]);
    Route::get("/{song}", [SongController::class, "show"]);
    Route::post("", [SongController::class, "create"]);
    Route::put("/{song}", [SongController::class, "update"]);
    Route::delete("/{song}", [SongController::class, "delete"]);
    Route::any("/{params:.*}",BadRequestController::class);
});




