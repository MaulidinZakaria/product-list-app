/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import ImageUpload from './ImageUpload';

export default function AddProductModal({ isOpen, onClose, onProductAdded }) {
    if (!isOpen) return null;
    const [resetImage, setResetImage] = useState(false);

    const handleBackdropClick = () => {
        onClose();
    };

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const [form, setForm] = useState({
        name: '',
        price: '',
        stock: '',
        description: '',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({
            ...form,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('stock', form.stock);
        if (form.description) {
            formData.append('description', form.description);
        }
        if (form.image) {
            formData.append('image', form.image);
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success('Produk berhasil ditambahkan!');
            onProductAdded();

            setForm({
                name: '',
                price: '',
                stock: '',
                description: '',
                image: null,
            });

            setResetImage(true);
            setTimeout(() => setResetImage(false), 100);
        } catch (e) {
            toast.error('Gagal menambahkan produk.');
        }
    };

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
                    <h2 className="text-xl font-semibold">Add Product</h2>
                    <button
                        onClick={onClose}
                        className="text-black hover:font-medium text-lg font-bold transition-all duration-200 cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
                    <ImageUpload onImageSelect={(file) => setForm({ ...form, image: file })} resetTrigger={resetImage} />
                    <input type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Product Name" className="w-full border rounded px-4 py-2" />
                    <input type="number" name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Price" className="w-full border rounded px-4 py-2" />
                    <input type="number" name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="Stock" className="w-full border rounded px-4 py-2" />
                    <textarea name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description" className="w-full border rounded px-4 py-2" />
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                            Submit
                        </button>
                    </div>
                </form>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
            </div>
        </div>
    );
}
