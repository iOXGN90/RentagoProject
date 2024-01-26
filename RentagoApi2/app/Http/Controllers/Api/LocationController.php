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
    public function storeLocation(Request $request)
    {
        // return response()->json(file(''));

        // Validation rules
        $validator = Validator::make($request->all(), [
            'long' => 'required|numeric',
            'lat' => 'required|numeric',
            'address' => 'required',
            'description' => 'required',
            'price' => 'required',
            'url.*' => 'image|mimes:jpeg,png,jpg,gif,svg|max:10000|required',
        ]);

        // Check for validation failure
        if ($validator->fails()) {
            return response()->json(['error' => ['message' => 'Validation Error', 'details' => $validator->errors()]], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
        }

        // Create Location
        $location = new Location();
        $location->long = $request->long;
        $location->lat = $request->lat;
        $location->address = $request->address;
        $location->description = $request->description;
        $location->user_id = $request->user_id; // Use authenticated user's ID
        $location->price = $request->price;
        $location->save();

        // Save images
        $location_id = $location->id;
        $multi_image = new MultiImage();
        $imagePaths = [];

        foreach ($request->file('url') as $image) {
            $imageName = time() . '_' . $image->getClientOriginalName();
            $image->storeAs('public/images', $imageName);
            $imagePaths[] = 'storage/images/' . $imageName;
        }

        // Save MultiImage
        $multi_image->url = json_encode($imagePaths);
        $multi_image->location_id = $location_id;
        $multi_image->save();

        // Response data
        $responseData = [
            'location' => $location,
            'multiImage' => $multi_image,
        ];

        return response()->json(['data' => $responseData, 'message' => 'Successfully Registered!'], JsonResponse::HTTP_OK);
    }
}