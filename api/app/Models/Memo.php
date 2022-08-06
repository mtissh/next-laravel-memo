<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;

class Memo extends Model
{
    use HasFactory;

    protected $fillable =
        [
            'user_id',
            'title',
            'body',
        ];

    /**
     * @param $user
     * @return mixed
     * @throws Exception
     */
    public function fetch($user): mixed
    {
        try {
            return Memo::where('user_id', $user->id)->latest()->get();
        } catch (Exception) {
            throw new Exception('Fetch Memos Failed.');
        }
    }

    /**
     * @param $request
     * @return JsonResponse
     * @throws Exception
     */
    public function register($request): JsonResponse
    {
        try {
            $this->fill($request);
            $this->save();
            return response()->json(['message' => 'メモの登録が完了しました。'], 201);
        } catch (Exception) {
            throw new Exception('Create Memo Failed.');
        }
    }
}
