<?php

namespace App\Services;

use Illuminate\Support\Facades\Auth;

class LoginService
{
    public function login($request)
    {
        if (Auth::check()) {
            return response()->json('You are already logged in', 200);
        }

        $validateFields = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($validateFields)) {
            return response()->json('Invalid credentials', 401);
        }

        $token = $request->user()->createToken('Bearer');

        return response()->json($token, 201);
    }
}
