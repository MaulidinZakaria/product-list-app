/* eslint-disable no-unused-vars */
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const DeleteProductButton = ({ id, onProductAdded }) => {
    const handleDelete = async () => {
        if (!confirm("Apakah anda yakin untuk menghapus produk ini?")) return;

        try {
            await axios.delete(`http://127.0.0.1:8000/api/product/${id}`);
            toast.success("Produk Berhasil Dihapus!");
            onProductAdded();
        } catch (err) {
            toast.error("Produk gagal dihapus.");
        }
    };
    return (
        <>
            <button onClick={handleDelete} className="bg-red-200 text-red-700 font-semibold px-4 py-2 rounded-xl shadow-lg hover:bg-red-300 transition-all duration-200">
                Delete
            </button>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </>
    )
}
export default DeleteProductButton