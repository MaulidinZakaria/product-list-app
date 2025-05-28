import React, { useRef, useState, useEffect } from 'react';

const ImageUpload = ({ onImageSelect, resetTrigger, previewUrl = null }) => {
    const inputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const urlImg = 'http://127.0.0.1:8000/storage/';

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPreview(URL.createObjectURL(file));
        onImageSelect(file);
    };

    const handleClick = () => {
        inputRef.current.click();
    };

    useEffect(() => {
        if (resetTrigger) {
            setPreview(null);
            if (inputRef.current) inputRef.current.value = null;
        }

        if (previewUrl != null) {
            setPreview(urlImg + previewUrl);
        }

    }, [resetTrigger, previewUrl]);

    return (
        <div className="flex flex-col justify-center items-center w-full gap-4">
            <div className={`size-30 flex flex-col gap-2 justify-center items-center rounded-xl overflow-hidden ${preview ? '' : 'border border-black border-dashed'}`}>
                {
                    preview ? (
                        <img src={preview} alt="Preview" className="object-cover w-full h-full" />
                    ) : (
                        <>
                            <i className="fa-solid fa-image text-4xl"></i>
                            <p className="text-sm">Product Image</p>
                        </>
                    )
                }
            </div>
            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <button type="button" onClick={handleClick} className="px-4 py-2 bg-blue-500 rounded-2xl text-white hover:bg-blue-700 transition-all duration-200 cursor-pointer text-xs">Upload File</button>
        </div>
    );
};

export default ImageUpload;
