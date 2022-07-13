<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KmlController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/kml', [KmlController::class, 'index'])->name('kml');
Route::post('kml/upload', [KmlController::class, 'upload'])->name('kml.upload');
Route::get('datakml', [KmlController::class, 'getData'])->name('data.kml');



Route::get('/', function () {
    return view('map');
})->name('map');