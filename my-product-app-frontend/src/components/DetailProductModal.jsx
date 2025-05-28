/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useEffect, useState } from "react";

export default function DetailProductModal({ isOpen, onClose, id }) {
    if (!isOpen) return null;
    const [product, setProduct] = useState([]);
    const urlImg = 'http://127.0.0.1:8000/storage/'

    const handleBackdropClick = () => {
        onClose();
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/product/' + id)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, [id]);

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/70 bg-opacity-50 z-50 flex items-center justify-center"
        >
            <div
                onClick={stopPropagation}
                className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Detail Product</h2>
                    <button
                        onClick={onClose}
                        className="text-black hover:font-medium text-lg font-bold transition-all duration-200 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex flex-col justify-center items-center w-full gap-4">
                        <div className="size-30 flex flex-col gap-2 justify-center items-center rounded-xl overflow-hidden">
                            <img src={urlImg + product.image} className="object-cover w-full h-full" />
                        </div>
                    </div>
                    <input type="text"
                        name="name"
                        value={product.name}
                        placeholder="Product Name" className="w-full border rounded px-4 py-2" readOnly />
                    <input type="number" name="price"
                        value={product.price}
                        placeholder="Price" className="w-full border rounded px-4 py-2" readOnly />
                    <input type="number" name="stock"
                        value={product.stock}
                        placeholder="Stock" className="w-full border rounded px-4 py-2" readOnly />
                    <textarea name="description"
                        value={product.description}
                        placeholder="Description" className="w-full border rounded px-4 py-2" readOnly />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
