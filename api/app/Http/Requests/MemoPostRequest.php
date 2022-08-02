<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class MemoPostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => ['required'],
            'body' => ['required']
        ];
    }

    public function messages()
    {
        return [
            'required' => '必須入力です。',
        ];
    }

    protected function prepareForValidation()
    {
        // ログイン中のユーザのIDを新規メモに紐付け
        $this->merge(['user_id' => Auth::id()]);
    }
}
