// Create this file at components/ProductItem.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    
    // Use a placeholder if the image URL is missing
    const imageUrl = image || 'https://via.placeholder.com/300';

    return (
        // The entire card is a link to the product's unique page
        <Link to={`/product/${id}`} className="block">
            <div className="group relative border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-square w-full bg-gray-100">
                    <img
                        src={imageUrl}
                        alt={name}
                        className="w-full h-full object-cover object-center"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-sm sm:text-md font-semibold text-gray-800 truncate">
                        {name}
                    </h3>
                    <p className="mt-1 text-md sm:text-lg font-bold text-gray-900">
                        {currency}{price}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;