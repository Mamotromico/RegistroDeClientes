<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

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

Route::get('/clients', 'ClientController@index')->middleware('auth:sanctum');
Route::post('/clients', 'ClientController@store')->middleware('auth:sanctum');
Route::get('/clients/{id}','ClientController@show')->middleware('auth:sanctum');
Route::put('/clients/{id}','ClientController@update')->middleware('auth:sanctum');
Route::post('/clients/{id}/delete', 'ClientController@destroy')->middleware('auth:sanctum');

Auth::routes();

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
