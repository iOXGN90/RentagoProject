<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\StudentController;
use App\Http\Controllers\API\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::get('/student', [StudentController::class, 'index']); ///this is for student table route
Route::post('/oauth/token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken');
Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);
// Route::post('check-email-availability', [UserController::class, 'checkEmailAvailability']);
// Get user details after login
Route::post('/logout', [RegisterController::class, 'logout'])->middleware('auth:api');
Route::get('/user', [RegisterController::class, 'getUser']);

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    // return $request->user();
// });
