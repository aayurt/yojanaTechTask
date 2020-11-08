<?php

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware('auth:api')->post('/employee', [App\Http\Controllers\EmployeeController::class, 'import']);
Route::middleware('auth:api')->post('/employeeDelete', [App\Http\Controllers\EmployeeController::class, 'delete']);
Route::middleware('auth:api')->post('/employeeAdd', [App\Http\Controllers\EmployeeController::class, 'add']);
Route::middleware('auth:api')->post('/employeeEdit', [App\Http\Controllers\EmployeeController::class, 'edit']);
Route::get('/exportUsers', [App\Http\Controllers\UserController::class, 'export']);
Route::get('/exportEmployees', [App\Http\Controllers\EmployeeController::class, 'export']);
Route::post('/exportEmployeesSome', [App\Http\Controllers\EmployeeController::class, 'exportSome']);
Route::middleware('auth:api')->get('/getEmployee', [App\Http\Controllers\EmployeeController::class, 'getEmployee']);
Route::post('/getEmployee', [App\Http\Controllers\EmployeeController::class, 'getIndex']);
