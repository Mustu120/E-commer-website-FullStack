import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../components/RelatedProducts';
import { toast } from 'react-toastify';

const Product = () => {
    const { products, currency, addToCart } = useContext(ShopContext);
    const { productId } = useParams();

    const [productData, setProductData] = useState(null);
    const [mainImage, setMainImage] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [activeTab, setActiveTab] = useState('description');

    useEffect(() => {
        if (products && productId) {
            const foundProduct = products.find(
                (item) => String(item._id) === String(productId)
            );
            setProductData(foundProduct || null);
        }
    }, [productId, products]);

    useEffect(() => {
        // UPDATED: Access the 'images' array
        if (productData?.images?.length > 0) {
            setMainImage(productData.images[0]);
            setSelectedSize(''); // Reset size selection when product changes
        }
    }, [productData]);

    const handleAddToCart = () => {
        if (productData.sizes?.length > 0 && !selectedSize) {
            toast.error("Please select a size.");
            return;
        }
        addToCart(productData._id, selectedSize);
        toast.success(`${productData.name} added to cart!`);
    };

    if (!productData) {
        return <div className="p-10 text-center text-gray-500">Loading product...</div>;
    }

    return (
        <div className="border-t-2 pt-10">
            <div className="flex gap-12 flex-col md:flex-row">
                {/* Image Gallery */}
                <div className="flex flex-col gap-3 w-full md:w-1/2">
                    <img
                        src={mainImage}
                        alt={productData.name}
                        className="w-full max-w-md mx-auto rounded-lg border shadow-sm aspect-square object-cover"
                    />
                    <div className="flex flex-wrap justify-center gap-3 mt-3">
                        {/* UPDATED: Map over the 'images' array */}
                        {productData.images.map((img, i) => (
                            <img
                                key={i}
                                src={img}
                                alt={`thumb-${i}`}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 object-cover cursor-pointer rounded-md border-2 transition ${
                                    mainImage === img ? 'border-black' : 'border-gray-300 hover:border-black'
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-gray-900">{productData.name}</h2>
                    <p className="text-gray-500 mt-1">
                        {productData.category} / {productData.subCategory}
                    </p>
                    <p className="mt-4 text-2xl font-semibold text-black">
                        {currency}{productData.price}
                    </p>

                    {/* Sizes */}
                    {productData.sizes?.length > 0 && (
                        <div className="mt-6">
                            <h3 className="font-semibold mb-2">Select Size</h3>
                            <div className="flex gap-3 flex-wrap">
                                {productData.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`px-4 py-2 rounded-md border transition ${
                                            selectedSize === size
                                                ? 'bg-black text-white border-black'
                                                : 'bg-white text-gray-700 border-gray-300 hover:border-black'
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Add to Cart */}
                    <button
                        onClick={handleAddToCart}
                        className="mt-6 px-6 py-3 bg-black text-white rounded-lg disabled:bg-gray-400 shadow hover:shadow-md transition"
                    >
                        Add to Cart
                    </button>
                    
                    <p className="mt-6 text-gray-600 leading-relaxed">
                        {productData.description}
                    </p>
                </div>
            </div>

            {/* Tabs Section */}
            <div className="mt-16">
                <div className="flex border-b">
                    {/* ... Tabs logic remains the same ... */}
                </div>
                <div className="p-6 border border-t-0 border-gray-200 rounded-b-lg">
                    {/* ... Tabs content remains the same ... */}
                </div>
            </div>

            {/* Related Products Section */}
            <RelatedProducts
                category={productData.category}
                subCategory={productData.subCategory}
            />
        </div>
    );
};

export default Product;