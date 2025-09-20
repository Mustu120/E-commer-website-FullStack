import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

// UPDATED: Added 'currentProductId' prop
const RelatedProducts = ({ category, subCategory, currentProductId }) => {
    const { products } = useContext(ShopContext);
    const [related, setRelated] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const filteredProducts = products.filter(
                (item) => 
                    // Match category and subCategory, but exclude the current product
                    item.category === category && 
                    item.subCategory === subCategory && 
                    item._id !== currentProductId 
            );

            setRelated(filteredProducts.slice(0, 5));
        }
    }, [products, category, subCategory, currentProductId]);

    // UPDATED: Don't render the component if there are no related products
    if (related.length === 0) {
        return null;
    }

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Title text1="RELATED" text2="PRODUCTS" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
                {related.map((item) => (
                    <ProductItem
                        key={item._id}
                        id={item._id}
                        name={item.name}
                        price={item.price}
                        // UPDATED: Correctly pass the first image from the 'images' array
                        image={item.images && item.images[0]}
                    />
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;