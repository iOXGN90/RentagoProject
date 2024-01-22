<?php
namespace App\Http\Controllers\Api;

use Illuminate\Support\Facades\Auth;
use App\Models\Location;
use App\Models\MultiImage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class LocationController extends Controller
{
    public function storeLocation(Request $request){

        $validator = Validator::make($request->all(), [
            'long' => 'required|numeric',
            'lat' => 'required|numeric',
            'address' => 'required',
            'description' => 'required',
            'price' => 'required',
            'url.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:2048|required',
        ]);

        if ($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }

        $location = new Location();
        $location->long = $request->long;
        $location->lat = $request->lat;
        $location->address = $request->address;
        $location->description = $request->description;
        $location->user_id = $request->user_id;
        $location->price = $request->price;


        $success['long'] =  $location->long;
        $success['lat'] =  $location->lat;
        $success['address'] =  $location->address;
        $success['description'] =  $location->description;
        $success['price'] =  $location->price;

        $location->save();

        $location_id = $location->id;
        $multi_image = new MultiImage();
        $imagePaths = [];

        foreach ($request->file('url') as $image) {
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/images', $imageName);
            $imagePaths[] = 'storage/images/' . $imageName;
        }

        $multi_image->url = json_encode($imagePaths);

        $multi_image->location_id = $location_id;
        $multi_image->save();

        // dd($imagePaths);

        $responseData = [
            'location' => $location,
            'multiImage' => $multi_image,
        ];

        $responseData['Successfully Registered!'] = $success;

        return response()->json($responseData, 200);
    }
}
