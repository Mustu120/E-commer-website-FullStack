import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
    const { backendUrl, token, currency } = useContext(ShopContext);
    const [orders, setOrders] = useState([]);
    
    // State to hold the flattened list of all items from all orders
    const [orderItems, setOrderItems] = useState([]);

    // Fetch orders from the backend
    useEffect(() => {
        async function fetchOrders() {
            if (token) {
                try {
                    const response = await axios.get(`${backendUrl}/api/order/userorders`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (response.data.success) {
                        setOrders(response.data.data);
                    } else {
                        toast.error("Failed to fetch orders");
                    }
                } catch (error) {
                    console.error("Failed to fetch orders:", error);
                    toast.error("An error occurred while fetching your orders.");
                }
            }
        }
        fetchOrders();
    }, [token, backendUrl]);

    // This effect runs when orders are fetched. It transforms the data
    // from a list of orders into a single list of all items.
    useEffect(() => {
        if (orders.length > 0) {
            const allItems = orders.flatMap(order =>
                order.items.map(item => ({
                    ...item,
                    orderDate: order.createdAt,
                    orderStatus: order.status,
                    orderId: order._id
                }))
            );
            setOrderItems(allItems);
        }
    }, [orders]);

    return (
        <div className="max-w-4xl mx-auto px-4 pt-20 pb-12 min-h-[80vh]">
            <Title text1="MY" text2="ORDERS" />

            {orderItems.length === 0 ? (
                <p className="text-center text-gray-500 mt-10">You have no orders yet.</p>
            ) : (
                <div className="mt-8 flex flex-col gap-4">
                    {/* Map over the flattened list of items */}
                    {orderItems.map((item, index) => (
                        <div key={`${item.orderId}-${index}`} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border rounded-lg shadow-sm">
                            
                            {/* Item Image */}
                            <img
                                className="w-24 h-24 object-cover rounded-md"
                                src={item.images[0]}
                                alt={item.name}
                            />

                            {/* Item Details */}
                            <div className="flex-grow">
                                <p className="font-semibold text-lg text-gray-800">{item.name}</p>
                                <p className="font-bold text-xl text-gray-900">{currency}{item.price}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity} | Size: {item.size || 'N/A'}</p>
                                <p className="text-sm text-gray-500 mt-1">
                                    Date: {new Date(item.orderDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                </p>
                            </div>
                            
                            {/* Status and Action Button */}
                            <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
                                <div className="flex items-center gap-2">
                                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                                    <p className="text-green-600 font-medium text-sm">{item.orderStatus}</p>
                                </div>
                                <button className="mt-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
                                    Track Order
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;