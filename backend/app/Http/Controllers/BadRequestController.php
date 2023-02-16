<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

/**
 * @class BadRequestController
 * @brief Controller for bad requests
 */
class BadRequestController extends Controller
{
    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function __invoke(Request $request)
    {
        return response()->json(['error' => 'Bad Request'], 400);
    }
}
