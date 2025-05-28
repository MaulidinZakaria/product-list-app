<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'AC',
                'price' => 3500000,
                'stock' => 15,
                'description' => 'AC hemat energi untuk ruangan rumah.',
                'image' => 'products/ac.jpeg',
            ],
            [
                'name' => 'Kulkas',
                'price' => 4200000,
                'stock' => 10,
                'description' => 'Kulkas dua pintu dengan fitur pendingin cepat.',
                'image' => 'products/kulkas.jpg',
            ],
            [
                'name' => 'HP',
                'price' => 2500000,
                'stock' => 30,
                'description' => 'HP Android terbaru dengan layar AMOLED.',
                'image' => 'products/hp.jpeg',
            ],
            [
                'name' => 'Speaker',
                'price' => 750000,
                'stock' => 25,
                'description' => 'Speaker Bluetooth dengan suara jernih dan bass kuat.',
                'image' => 'products/speaker.jpeg',
            ],
            [
                'name' => 'TV',
                'price' => 5000000,
                'stock' => 8,
                'description' => 'Smart TV 50 inci dengan resolusi 4K.',
                'image' => 'products/tv.jpeg',
            ],
            [
                'name' => 'Oven',
                'price' => 1500000,
                'stock' => 12,
                'description' => 'Oven listrik dengan pengatur suhu otomatis.',
                'image' => 'products/oven.jpeg',
            ],
            [
                'name' => 'Setrika',
                'price' => 350000,
                'stock' => 40,
                'description' => 'Setrika uap dengan permukaan anti lengket.',
                'image' => 'products/setrika.jpeg',
            ],
            [
                'name' => 'Tablet',
                'price' => 3200000,
                'stock' => 20,
                'description' => 'Tablet 10 inci dengan stylus dan performa tinggi.',
                'image' => 'products/tablet.jpg',
            ],
            [
                'name' => 'Laptop',
                'price' => 7500000,
                'stock' => 18,
                'description' => 'Laptop Core i5 dengan SSD dan RAM 8GB.',
                'image' => 'products/laptop.jpeg',
            ],
            [
                'name' => 'Mesin Cuci',
                'price' => 3800000,
                'stock' => 9,
                'description' => 'Mesin cuci otomatis dengan kapasitas besar.',
                'image' => 'products/mesin-cuci.jpeg',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
