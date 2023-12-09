<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\QueryException;

class RegisterController extends BaseController
{
    /**
     * Register a new user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'c_password' => 'required|same:password',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors());
        }

        try {
            $user = User::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
            ]);

            $token = $user->createToken('MyApp', ['name' => $user->name])->accessToken;

            $response = [
                'token' => $token,
                'name' => $user->name,
            ];

            return $this->sendResponse($response, 'User registered successfully.');
        } catch (QueryException $e) {
            if (strpos($e->getMessage(), 'Duplicate entry') !== false) {
                return $this->sendError('Email already taken.', [], JsonResponse::HTTP_CONFLICT);
            }

            return $this->sendError('Registration failed.', [], JsonResponse::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Log in a user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request): JsonResponse
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            /** @var \App\Models\MyUserModel $user **/
            $user = Auth::user();
            $token = $user->createToken('MyApp')->accessToken;

            $response = [
                'token' => $token,
                'name' => $user->name,
            ];

            return $this->sendResponse($response, 'User login successfully.');
        } else {
            return $this->sendError('Unauthorised.', ['error' => 'Unauthorised']);
        }
    }

    /**
     * Get the authenticated user's information after login.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUser()
    {
        $user = Auth::user();
        return $this->sendResponse($user, 'User details retrieved successfully.');
    }
}
