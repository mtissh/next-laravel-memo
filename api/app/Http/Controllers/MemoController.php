<?php

namespace App\Http\Controllers;

use App\Http\Requests\MemoPostRequest;
use App\Http\Resources\MemoResource;
use App\Models\Memo;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Auth;

class MemoController extends Controller
{
    public function __construct(User $user, Memo $memo)
    {
        $this->user = $user;
        $this->memo = $memo;
    }

    /**
     * メモの全件取得
     * @return AnonymousResourceCollection
     * @throws Exception
     */
    public function fetch(): AnonymousResourceCollection
    {
        $memos = $this
            ->memo
            ->fetch(
                $this
                    ->user
                    ->fetch(Auth::id())
            );
        return MemoResource::collection($memos);
    }

    /**
     * メモの登録
     * @param MemoPostRequest $request
     * @return JsonResponse
     */
    public function create(MemoPostRequest $request): JsonResponse
    {
        // 処理
    }
}
