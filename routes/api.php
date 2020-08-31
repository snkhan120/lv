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

Route::get('/products', 'ProductController@index')->name('product.index');

Route::post('/products', 'ProductController@store')->name('product.store');

// Route::get('/products/{id}', 'ProductController@show')->name('product.show');
Route::get('/products/{product}', 'ProductController@show');

Route::put('/products/{product}', 'ProductController@update')->name('product.update');

Route::delete('/products/{product}', 'ProductController@destory');
