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
    public function singleProfile($id){
        $users =  User::findOrFail($id);
        
        return response()->json($users);
    }
}
