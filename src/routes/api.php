<?php

use App\Http\Controllers\MessageController;
use App\Http\Controllers\TicketsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('tickets', [TicketsController::class, 'index']);
Route::get('tickets/{ticket}', [TicketsController::class, 'show']);
Route::post('tickets', [TicketsController::class, 'store']);
Route::put('tickets/{ticket}', [TicketsController::class, 'update']);
Route::delete('tickets/{ticket}', [TicketsController::class, 'delete']);

Route::get('messages', [MessageController::class, 'index']);
Route::get('messages/{message}', [MessageController::class, 'show']);
Route::post('messages', [MessageController::class, 'store']);
Route::put('messages/{message}', [MessageController::class, 'update']);
Route::delete('messages/{message}', [MessageController::class, 'delete']);
