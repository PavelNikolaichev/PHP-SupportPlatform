<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\LoginService;
use App\Services\RegisterService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function registrationIndex()
    {
        if (Auth::check()) {
            return redirect(route('name.private'));
        }

        return view('registration');
    }

    public function loginIndex()
    {
        if (Auth::check()) {
            return redirect(route('name.private'));
        }

        return view('login');
    }

    // Make a separate service for registration
    public function save(Request $request)
    {
        if (Auth::check()) {
            return redirect(route('user.private'));
        }

        $validateFields = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (User::where('email', $validateFields['email'])->exists()) {
            redirect(route('user.registration'))->withErrors([
                'email' => 'This email has already been registered'
            ]);
        }

        $user = User::create($validateFields);
        if (!$user) {
            return redirect(route('user.login'))->withErrors([
                'formError' => 'Error occurred during save of the user'
            ]);
        }

        Auth::login($user);
        return redirect(route('user.private'));
    }

    public function login(Request $request)
    {
        if (Auth::check()) {
            return redirect(route('user.private'));
        }

        $formFields = $request->only(['email', 'password']);

        if (Auth::attempt($formFields)) {
            return redirect()->intended(route('user.private'));
        }

        return redirect(route('user.login'))->withErrors([
            'formError' => 'Error during login attempt. Check your credentials and try again'
        ]);
    }

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
