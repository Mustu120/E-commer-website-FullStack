import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets'; // Assuming you have assets like a parcel icon

const Orders = ({ url, token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }
    try {
      // Use the 'Authorization' header as per best practices
      const response = await axios.get(`${url}/api/order/list`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.data.success) {
        const sortedOrders = response.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      toast.error("Failed to fetch orders.");
    }
  };

  const statusUpdateHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const response = await axios.patch(`${url}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { 'Authorization': `Bearer ${token}` } }
      );
      if (response.data.success) {
        toast.success("Order status updated!");
        await fetchAllOrders(); // Re-fetch to show the latest status
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating order status.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchAllOrders();
    }
  }, [token]);

  return (
    <div className='w-11/12 max-w-5xl mx-auto my-12 text-gray-800'>
      <h3 className='text-2xl font-semibold mb-6'>Admin Orders Page</h3>
      <div className='flex flex-col gap-5'>
        {orders.map((order) => (
          <div 
            key={order._id} 
            className='grid items-start gap-y-5 gap-x-6 p-5 border border-gray-300 rounded-lg bg-gray-50 text-sm 
                       md:grid-cols-[1fr_2fr] 
                       lg:grid-cols-[0.5fr_2fr_1fr_1fr] lg:items-center'
          >
            <img className='w-12 justify-self-center' src={assets.parcel_icon} alt='Parcel Icon' />
            
            <div>
              <p className='font-semibold'>
                {order.items.map((item, index) => (
                  // Added item.size as seen in the screenshot
                  <span key={index}>
                    {item.name} x {item.quantity}
                    {index === order.items.length - 1 ? '' : ', '}
                  </span>
                ))}
              </p>
              <p className='font-semibold text-base mt-4 mb-1'>
                {order.address.firstName} {order.address.lastName}
              </p>
              <div className='text-gray-600'>
                <p>{order.address.street},</p>
                <p>
                  {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode} 
                </p>
              </div>
              <p className='text-gray-600'>{order.address.phone}</p>
            </div>

            <div className='text-left'>
                {/* --- ADDED FIELDS BASED ON SCREENSHOTS --- */}
                <p><strong>Items:</strong> {order.items.length}</p>
                <p><strong>Method:</strong> {order.paymentMethod || 'N/A'}</p>
                <p><strong>Payment:</strong> {order.payment ? 'Done' : 'Pending'}</p>
                <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                <p className='font-semibold text-base mt-2'>${order.amount.toFixed(2)}</p>
            </div>
            
            <select 
              onChange={(e) => statusUpdateHandler(e, order._id)} 
              value={order.status}
              className='bg-white border border-gray-400 p-2 rounded outline-none w-full max-w-[150px] justify-self-start md:justify-self-end'
            >
              {/* --- UPDATED STATUS OPTIONS BASED ON SCREENSHOT --- */}
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;