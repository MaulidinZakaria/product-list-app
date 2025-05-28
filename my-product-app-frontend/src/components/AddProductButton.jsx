import { useState } from 'react';
import AddProductModal from '../components/AddProductModal';

export default function AddProductButton({ onProductAdded }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex px-4 py-2 justify-between items-center rounded-3xl shadow-md bg-blue-600 text-white gap-2 cursor-pointer hover:bg-blue-700 transition-colors duration-300"
            >
                <p>Add Product</p>
                <i className="fa-regular fa-square-plus text-lg"></i>
            </button>

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={onProductAdded}
            />
        </>
    );
}
