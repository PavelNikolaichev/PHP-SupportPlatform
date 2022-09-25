<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class RegisterService
{
    public function register($request)
    {
        if (Auth::check()) {
            return response()->json('You are already logged in', 200);
        }

        $validateFields = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (User::where('email', $validateFields['email'])->exists()) {
            return response()->json('This email has already been registered', 401);
        }

        $user = User::create($validateFields);
        if (!$user) {
            return response()->json('Error occurred during save of the user', 401);
        }

        Auth::login($user);
        $token = $request->user()->createToken('Bearer');

        return response()->json([
            'token' => $token,
            'is_support' => $request->user()->is_support
        ], 201);
    }
}
