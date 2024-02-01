<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\API\LocationController;
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


Route::post('register', [RegisterController::class, 'register']);
Route::post('login', [RegisterController::class, 'login']);
Route::post('/logout', [RegisterController::class,'logout'])->middleware('auth:api');;
Route::post('store-location', [LocationController::class, 'storeLocation']);
Route::get('profile/{id}', [UserController::class, 'profile']);
Route::get('find-location', [LocationController::class, 'find_location']);
Route::get('single-profile/{id}', [UserController::class, 'singleProfile']);

