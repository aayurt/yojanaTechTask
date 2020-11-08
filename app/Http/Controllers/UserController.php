<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Exports\UsersExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\User;

class UserController extends Controller
{
     public function export() 
    {
        return Excel::download(new UsersExport, 'users.xlsx');
    }

     public function userCookieSet($id) 
    {
        $user_token = User::where('id',$id)->get();
        return ["api"=>$user_token];
    }
}
