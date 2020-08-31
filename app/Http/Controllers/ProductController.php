<?php

namespace App\Http\Controllers;

use App\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $product = Product::all();
        return response()->json($product);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'description' => 'required',
            'price' => 'required',
            'imageFile' => 'mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $fileName = null;

        if ($request->hasFile('imageFile')) {

            $publicPath = "images/products/";

            //get img file
            $image = $request->file('imageFile');

            // image name
            $name = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path($publicPath);

            $image->move($destinationPath, $name);
            
            $fileName = $publicPath.$name;
            
        }
        // save product
        $product = Product::create([
            'image' => $fileName,
            'name' => $request->name,
            'category' => $request->category,
            'description' => $request->description,
            'price' => $request->price
        ]);

        return response()->json(['message'=> 'Product created', 'product' => $product]);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return $product;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function edit(Product $product)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required',
            'category' => 'required',
            'description' => 'required',
            'image' => 'required',
            'price' => 'required'
        ]);

        $product->name = $request->name();
        $product->category = $request->category();
        $product->description = $request->description();
        $product->image = $request->image();
        $product->price = $request->price();
        $product->save();

        return response()->json([
            'message' => 'Product Updated!',
            'product' => $product
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->delete();
        
        return response()->json([
            'message' => 'Product deleted'
        ]);
    }
}
