<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    /**
     * ログイン
     * @param LoginRequest $request
     * @return JsonResource
     * @throws ValidationException
     */
    public function login(LoginRequest $request): JsonResource
    {
        // ログイン成功
        if (Auth::attempt($request->all())) {
            $request->session()->regenerate();
            // APIリソース（Json）を返却
            return new UserResource((Auth::user()));
        }

        // ログイン失敗、エラーメッセージのthrow
        throw ValidationException::withMessages([
            'loginFailed' => 'ID またはパスワードが間違っています。'
        ]);
    }
}
