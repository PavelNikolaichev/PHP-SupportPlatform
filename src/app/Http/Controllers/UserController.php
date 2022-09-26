<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\LoginService;
use App\Services\RegisterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function loginAPI(Request $request)
    {
        $loginService = new LoginService();
        return $loginService->login($request);
    }

    public function registerAPI(Request $request)
    {
        $registrationService = new RegisterService();
        return $registrationService->register($request);
    }

    public function logout()
    {
        Auth::logout();
        return redirect(route('home'));
    }
}
