import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ProductTable from './components/ProductTable';
import AddProductButton from './components/AddProductButton';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paginationMeta, setPaginationMeta] = useState(null);


  const fetchProducts = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/product', {
        params: { page }
      });

      setProducts(response.data.data);
      setPaginationMeta(response.data.meta);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };


  const handleSearch = async (keyword) => {

    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/product', {
        params: { search: keyword }
      });
      setProducts(response.data.data);
      setPaginationMeta(response.data.meta);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to search products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex w-full h-screen bg-gray-200">
      <Sidebar />
      <div className="w-full h-full px-7 py-5 flex flex-col gap-7">
        <Header title="Manage Products" />
        <div className="flex flex-col bg-white w-full h-full rounded-2xl shadow-xl">
          <div className="w-full flex justify-between items-center p-5 border-b border-gray-300">
            <SearchBar onSearch={handleSearch} />
            <AddProductButton onProductAdded={fetchProducts} />
          </div>

          <div className="w-full h-full p-5 flex flex-col">
            <div className="text-black font-medium text-lg">Product List</div>

            {loading && products.length === 0 ? (
              <div className="w-full h-full flex justify-center items-center">
                <div className="text-black text-lg font-semibold">Loading...</div>
              </div>
            ) : error ? (
              <div className="text-red-600 font-semibold">{error}</div>
            ) : (
              <ProductTable products={products} onProductAdded={fetchProducts} />
            )}
            <div className="flex gap-2 mt-4 items-center justify-end">
              {paginationMeta?.links?.map((link, index) => {
                // Abaikan tombol "Previous" dan "Next" dengan label berupa teks HTML
                const isNav = link.label.includes('Previous') || link.label.includes('Next');

                return (
                  <button
                    key={index}
                    disabled={!link.url || link.active}
                    onClick={() => {
                      if (link.url) {
                        const url = new URL(link.url);
                        const page = url.searchParams.get('page');
                        fetchProducts(parseInt(page));
                      }
                    }}
                    className={`px-3 py-1 rounded-md border ${link.active
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-white text-black hover:bg-blue-100'
                      } ${isNav ? 'hidden md:inline-block' : ''}`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
