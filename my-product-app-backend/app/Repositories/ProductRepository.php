<?php

namespace App\Repositories;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductRepository
{
    public function getAll(array $fields, Request $request)
    {
        $query = Product::select($fields)->latest();

        if ($request->filled('search')) {
            $keyword = $request->input('search');
            $query->where(function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%");
            });
        }

        return $query->paginate(5);
    }

    public function findById(int $id, array $fields)
    {
        return Product::select($fields)->findOrFail($id);
    }

    public function create(array $data)
    {
        return Product::create($data);
    }

    public function update(int $id, array $data)
    {
        $product = Product::findOrFail($id);
        $product->update($data);
        return $product;
    }

    public function delete(int $id)
    {
        $product = Product::findOrFail($id);
        return $product->delete();
    }
}
