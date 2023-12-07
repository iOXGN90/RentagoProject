<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function checkEmailAvailability(Request $request)
    {
        // Your logic to check email availability goes here
        $email = $request->input('email');

        // Example logic (replace this with your actual logic)
        $isAvailable = !User::where('email', $email)->exists();

        return response()->json(['available' => $isAvailable]);
    }
}
