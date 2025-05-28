import { useState } from "react";
import DetailProductModal from "./DetailProductModal";

const DetailProductButton = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-200 text-blue-700 font-semibold px-4 py-2 rounded-xl shadow-lg hover:bg-blue-300 cursor-pointer transition-all duration-200">
                Detail
            </button>

            <DetailProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                id={id}
            />
        </>
    )
}
export default DetailProductButton