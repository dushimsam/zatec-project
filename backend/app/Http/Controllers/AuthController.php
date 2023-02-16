<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;

/**
 * @class AuthController
 * @brief Controller for User Authentication services
 */
class AuthController extends Controller
{
    /**
     * Get details about  my profile (logged in)
     * @return JsonResponse
     */
    public function self(Request $request)
    {
        return $request->user();
    }

    /**
     * Register a User
     * @param Request $request
     * @return JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        // Validate request parameters
        $validator = Validator::make($request->json()->all() , [
            'full_name' => 'required|string|max:255|min:3',
            'username' => 'required|string|max:255|min:3|unique:users',
            'email' => 'required|string|email|max:255|unique:users|min:8',
            'password' => 'required|string|min:6|max:20'
        ]);

        // Return error if validation fails
        if($validator->fails())
            return response()->json($validator->errors(), 400);

        try{
            // Create new User
            User::query()->create([
                'full_name' => $request->json()->get('full_name'),
                'username' => $request->json()->get('username'),
                'email' => $request->json()->get('email'),
                'password' => Hash::make($request->json()->get('password')),
            ]);
        }catch (\Illuminate\Database\QueryException $ex) {
            // If an exception is thrown, return an error response
            return response()->json(['message' => $ex->getMessage()], 501);
        }
        // Return success message
        return response()->json(['message' => 'You are successfully registered.'],201);
    }

    /**
     * Handle a login request
     * @param Request $request
     * @return JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        // Validate request parameters
        $valid = Validator::make($request->json()->all(),[
            "login"=> ["required","string"],
            "password" => ["required","string"]
        ]);
        $input = $request->all();

        // Return error if validation fails
        if($valid->fails())
            return response()->json($valid->errors(),400);

        // Get the field that was represented by login parameter in the request (email or username)
        $fieldType = filter_var($request->login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        // Form a credential object made by (email or username) AND password
        $credentials = array($fieldType => $input['login'], 'password' => $input['password']);

        // Attempt login request
        if (!$token = JWTAuth::attempt($credentials)) {
            // Return the Invalid credentials message if the login fails
            return response()->json(['message' => 'Invalid Credentials'], 404);
        }

        // Return the token after a successful authentication
        return response()->json(compact('token'));
    }
}
