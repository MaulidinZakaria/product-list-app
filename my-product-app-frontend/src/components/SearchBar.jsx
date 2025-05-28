import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className="w-full max-w-md relative flex justify-center items-center">
            <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search product..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-2xl shadow-lg focus:outline-none bg-white focus:ring-1"
            />
            <i className="fa-solid fa-magnifying-glass absolute right-4 text-black"></i>
        </div>
    );
};

export default SearchBar;
