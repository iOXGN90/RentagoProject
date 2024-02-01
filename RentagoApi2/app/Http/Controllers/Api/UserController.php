<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;


class UserController extends Controller
{
    public function profile($id){
        try {
            $user = User::findOrFail($id);
            return response()->json($user);
        } catch (\Exception $e) {
            dd(response()->json($e->getMessage()));
        }
    }
    public function singleProfile($id)
{
    $usersInfoWithImages = DB::table('users')
            ->join('locations', 'users.id', '=', 'locations.user_id')
            ->join('multi_images', 'locations.id', '=', 'multi_images.location_id')
            ->where('users.id', '=', $id)
            ->select('users.*', 'locations.id', 'multi_images.url')
            ->first();

        return response()->json(['data' => $usersInfoWithImages]);
}
}