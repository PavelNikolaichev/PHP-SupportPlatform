<?php

use App\Http\Controllers\TicketsController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
})->name('home');

Route::get('/ticket-list', [TicketsController::class, 'index']);

Route::name('user.')->group(function() {
    Route::view('/private', 'private')->middleware('auth')->name('private');
    Route::get('/login', [UserController::class, 'loginIndex'])->name('login');

    Route::post('/login', [UserController::class, 'login']);
    Route::get('/logout', [UserController::class, 'logout'])->name('logout');
    Route::get('/registration', [UserController::class, 'registrationIndex'])->name('registration');

    Route::post('/registration', [UserController::class, 'save']);
});
