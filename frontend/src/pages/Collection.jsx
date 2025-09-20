import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "../components/ProductItem";

const Collection = () => {
    const { products, search, showSearch } = useContext(ShopContext);

    // --- STATE MANAGEMENT ---
    const [showFilter, setShowFilter] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState("");

    const categories = ["Men", "Women", "Kids", "Accessories"];
    const types = ["Topwear", "Bottomwear", "Winterwear", "Footwear"];

    // --- EVENT HANDLERS ---
    const toggleCategory = (e) => {
        const value = e.target.value;
        setCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const toggleSubCategory = (e) => {
        const value = e.target.value;
        setSubCategory((prev) =>
            prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
        );
    };

    const handleSortChange = (e) => setSortType(e.target.value);

    // NEW: Function to clear all active filters
    const clearFilters = () => {
        setCategory([]);
        setSubCategory([]);
        setSortType("");
    };

    // --- FILTER AND SORT LOGIC (Unchanged - Already Solid!) ---
    useEffect(() => {
        let productsCopy = products ? [...products] : [];

        if (showSearch && search) {
            productsCopy = productsCopy.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (category.length > 0) {
            productsCopy = productsCopy.filter((item) => category.includes(item.category));
        }
        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
        }
        switch (sortType) {
            case "price-asc":
                productsCopy.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                productsCopy.sort((a, b) => b.price - a.price);
                break;
            default:
                break;
        }
        setFilteredProducts(productsCopy);
    }, [products, category, subCategory, sortType, search, showSearch]);

    // --- RENDER ---
    return (
        <div className="flex flex-col lg:flex-row gap-8 py-8 border-t">
            {/* --- Filter Sidebar --- */}
            <aside className="lg:w-1/4 xl:w-1/5">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Filter Options</h2>
                    {/* NEW: Clear All Button */}
                    <button onClick={clearFilters} className="text-sm text-indigo-600 hover:underline">
                        Clear All
                    </button>
                </div>

                {/* Categories Filter */}
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-3 text-gray-800">CATEGORIES</h3>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <label key={cat} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={cat}
                                        checked={category.includes(cat)}
                                        onChange={toggleCategory}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-700">{cat}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    
                    {/* Sub-Category Filter */}
                    <div>
                        <h3 className="font-semibold mb-3 text-gray-800">TYPE</h3>
                        <div className="space-y-2">
                            {types.map((type) => (
                                <label key={type} className="flex items-center space-x-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        value={type}
                                        checked={subCategory.includes(type)}
                                        onChange={toggleSubCategory}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <span className="text-gray-700">{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* --- Products Section --- */}
            <main className="flex-grow">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 className="text-3xl font-bold text-gray-900">All Collections</h1>
                    <select
                        value={sortType}
                        onChange={handleSortChange}
                        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="">Sort by: Relevant</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.length === 0 ? (
                        <p className="text-gray-500 col-span-full text-center py-10">
                            No products match your filters.
                        </p>
                    ) : (
                        filteredProducts.map((product) => (
                            // UPDATED: Pass props explicitly for clarity and correctness
                            <ProductItem
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                price={product.price}
                                image={product.images && product.images[0]} // Pass the first image URL
                            />
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Collection;