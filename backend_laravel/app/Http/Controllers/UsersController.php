<?php

namespace App\Http\Controllers;

use App\Models\User;

class UsersController extends Controller
{
    public function index()
    {
        $perPage = request('per_page', 10);
        
        return User::with('posts')
            ->paginate($perPage);
    }
}
