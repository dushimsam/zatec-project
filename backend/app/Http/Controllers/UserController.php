<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;


/**
 * @class UserController
 * @brief Controller for User model
 */
class UserController extends Controller
{
    /**
     * Get list of Users
     * @return JsonResponse
     */
    public function all(): JsonResponse
    {
        return response()->json(User::all());
    }

    /**
     * Get details about a single User
     * @param User $user
     * @return JsonResponse
     */
    public function show(User $user): JsonResponse
    {
        return response()->json($user);
    }

}
