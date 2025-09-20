import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Make sure your List component receives 'url' and 'token' as props
const List = ({ url, token }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            if (response.data.success) {
                setList(response.data.data);
            } else {
                toast.error("Error: Could not fetch the product list.");
            }
        } catch (error) {
            toast.error("Network Error: Could not connect to the server.");
        }
    };

    const removeProduct = async (productId) => {
        try {
            // **FIX 1: ADDING THE AUTHORIZATION HEADER**
            const response = await axios.delete(`${url}/api/product/${productId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList(); // Refresh the list after deleting
            } else {
                toast.error("Error: Could not remove product.");
            }
        } catch (error) {
            toast.error("Failed to remove product. You may not be authorized.");
        }
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <div className="p-4 sm:p-6 w-full text-gray-700">
            <h2 className="text-2xl font-semibold mb-5">All Products List</h2>
            
            {/* **FIX 2: PROPER TABLE STRUCTURE AND STYLING** */}
            <div className="overflow-x-auto">
                {list.length > 0 ? (
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">Image</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/5">Name</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {list.map((item) => (
                                <tr key={item._id} className="hover:bg-gray-50">
                                    <td className="py-3 px-4">
                                        <img 
                                            src={item.images?.[0] || 'https://via.placeholder.com/150'} 
                                            alt={item.name}
                                            className="w-16 h-16 object-cover rounded-md" 
                                        />
                                    </td>
                                    <td className="py-3 px-4 font-medium break-words">{item.name}</td>
                                    <td className="py-3 px-4 text-sm">{item.category}</td>
                                    <td className="py-3 px-4 text-sm">₹{item.price}</td>
                                    <td 
                                        onClick={() => removeProduct(item._id)} 
                                        className="py-3 px-4 text-center text-red-500 font-bold text-xl cursor-pointer"
                                    >
                                        X
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center py-10">No products to display.</p>
                )}
            </div>
        </div>
    );
};

export default List;