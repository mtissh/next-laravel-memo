<?php

use App\Http\Controllers\LoginController;
use App\Http\Controllers\MemoController;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

// ログインAPI
Route::post('/login', [LoginController::class, 'login']);

// メモ全件取得
Route::get('/memos', [MemoController::class, 'fetch']);

// メモ登録
Route::post('/memos', [MemoController::class, 'create']);

// ログイン中のユーザーを取得
Route::get('/user', function() {
    $user = Auth::user();
    return $user ? new UserResource($user) : null;
});
