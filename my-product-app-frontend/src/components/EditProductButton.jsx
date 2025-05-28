import { useState } from "react";
import EditProductModal from "./EditProductModal";

const EditProductButton = ({ onProductAdded, id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="bg-yellow-200 text-yellow-700 font-semibold px-4 py-2 rounded-xl shadow-lg hover:bg-yellow-300 transition-all duration-200">
                Edit
            </button>
            <EditProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductUpdated={onProductAdded}
                id={id}
            />
        </>
    )
}
export default EditProductButton