<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Auth;

class UserAccessible
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
       $token = $request->header('AUTH_KEY');
if($token != "ABCD"){
 return response()->json(['msg'=>'not authenticated'],401);
}
          

            return $next($request);
    }
}
