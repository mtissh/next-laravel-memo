<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Memo extends Model
{
    use HasFactory;

    /**
     * @param $user
     * @return mixed
     * @throws Exception
     */
    public function fetch($user): mixed
    {
        try {
            return Memo::where('user_id', $user->id)->get();
        } catch (Exception) {
            throw new Exception('Fetch Memos Failed.');
        }
    }
}
