<?php

namespace App\Services;

use App\Repositories\ProductRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    private $productRepository;

    public function __construct(ProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getAllProducts(array $fields, Request $request)
    {
        return $this->productRepository->getAll($fields, $request);
    }

    public function getProductById(int $id, array $fields)
    {
        return $this->productRepository->findById($id, $fields ?? ['*']);
    }

    private function uploadPhoto(UploadedFile $file)
    {
        $path = $file->store('products', 'public');
        if (!$path) {
            throw new \Exception('Gagal menyimpan file.');
        }
        return $path;
    }



    private function deletePhoto(string $imagePath)
    {
        if (Storage::disk('public')->exists($imagePath)) {
            Storage::disk('public')->delete($imagePath);
        }
    }

    public function createProduct(array $data)
    {
        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if ($data['image']->isValid()) {
                $data['image'] = $this->uploadPhoto($data['image']);
                if (empty($data['image'])) {
                    throw new \Exception('Path file upload kosong.');
                }
            } else {
                throw new \Exception('Gagal mengunggah file: file tidak valid.');
            }
        }

        return $this->productRepository->create($data);
    }


    public function updateProduct(int $id, array $data)
    {
        $fields = ['id', 'image'];
        $product = $this->productRepository->findById($id, $fields);

        if (!$product) {
            throw new ModelNotFoundException("Product not found");
        }

        if (isset($data['image']) && $data['image'] instanceof UploadedFile) {
            if (!empty($product->image)) {
                $this->deletePhoto($product->image);
            }
            $data['image'] = $this->uploadPhoto($data['image']);
        }

        return $this->productRepository->update($id, $data);
    }


    public function deleteProduct(int $id)
    {
        $fields = ['id', 'image'];
        $product = $this->productRepository->findById($id, $fields);

        if (!empty($product->image)) {
            $this->deletePhoto($product->image);
        }

        return $this->productRepository->delete($id);
    }
}
