<?php

namespace App\Http\Controllers;

use App\Models\Kml;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Redirect;

class KmlController extends Controller
{
    //

    public function index()
    {

        return view('kml');
    }


    public function getData()
    {

        $data = Kml::all();
        return response()->json($data);
    }

    public function upload(Request $request)
    {
        if ($request->hasFile('kml')) {

            $name = 'kml_' . Carbon::now()->timestamp . '.' . $request->file('kml')->getClientOriginalExtension();

            $imagePath = 'storage/datakml/' . $name;

            $kml = new Kml;
            $kml->file = URL::asset($imagePath);
            // $kml->file = $name;
            $request->file('kml')->storeAs('datakml', $name, 'public');

            try {
                $kml->save();
                DB::commit();

                return Redirect::back()->withErrors(['msg' => 'Berhasil']);
            } catch (\Throwable $th) {
                DB::rollBack();
                dd($th);
            }
        }
        // echo '<script>
        // alert("berhasil upload")
        // </script>';
    }
}