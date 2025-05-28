<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Services\ProductService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private $productService;
    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $fields = [
            'id',
            'name',
            'price',
            'stock',
            'image',
        ];

        $products = $this->productService->getAllProducts($fields, $request);
        return ProductResource::collection($products);
    }

    public function store(ProductRequest $request)
    {
        $data = $request->validated();
        $data['image'] = $request->file('image');
        $product = $this->productService->createProduct($data);

        return response()->json(new ProductResource($product));
    }

    public function show(int $id)
    {
        try {
            $fields = [
                'id',
                'name',
                'price',
                'stock',
                'description',
                'image',
            ];

            $product = $this->productService->getProductById($id, $fields);

            return response()->json(new ProductResource($product));
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    public function update(ProductRequest $request, int $id)
    {
        try {
            $data = $request->validated();
            if ($request->hasFile('image')) {
                $data['image'] = $request->file('image');
            }
            $product = $this->productService->updateProduct($id, $data);

            return response()->json(new ProductResource($product));
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $this->productService->deleteProduct($id);
            return response()->json(['message' => 'Product deleted successfully']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => 'Product not found'], 404);
        }
    }
}
