import React from 'react';
import DetailProductButton from './DetailProductButton';
import EditProductButton from './EditProductButton';
import DeleteProductButton from './DeleteProductButton';

const urlImg = 'http://127.0.0.1:8000/storage/'

const ProductTable = ({ products, onProductAdded }) => (
    <table className="w-full table-fixed">
        <tbody className="text-gray-800">
            {products.map(product => (
                <tr key={product.id} className="border-b border-gray-300">
                    <td className="px-4 py-2">
                        <div className="w-full h-full flex justify-start items-center">
                            <img src={urlImg + product.image} alt="" className="size-16 rounded-xl object-cover" />
                            <div className="pl-4 flex flex-col h-full justify-center">
                                <p className="text-black text-lg font-medium">{product.name}</p>
                                <p className="text-blue-500 font-bold text-base">Rp. {product.price}</p>
                            </div>
                        </div>
                    </td>
                    <td className="px-4 py-2 text-center text-lg font-medium">{product.stock} Stok</td>
                    <td className="px-4 py-2">
                        <div className="flex justify-end items-center space-x-2">
                            <DetailProductButton id={product.id} />
                            <EditProductButton id={product.id} onProductAdded={onProductAdded} />
                            <DeleteProductButton id={product.id} onProductAdded={onProductAdded} />
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
);

export default ProductTable;
