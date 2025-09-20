import React, { useEffect, useContext } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { backendUrl } = useContext(ShopContext);
    
    // Extract success status and orderId from the URL parameters
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");

    const verifyPayment = async () => {
        try {
            const response = await axios.post(`${backendUrl}/api/order/verify`, { success, orderId });
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/orders"); // Navigate to the user's orders page on success
            } else {
                toast.error(response.data.message);
                navigate("/"); // Navigate home on failure
            }
        } catch (error) {
            toast.error("Payment verification failed. Please contact support.");
            navigate("/");
        }
    };

    // Run the verification function once when the component loads
    useEffect(() => {
        verifyPayment();
    }, []);

    return (
        <div className='min-h-[80vh] flex flex-col items-center justify-center'>
            <div className='w-16 h-16 border-4 border-t-black border-gray-200 rounded-full animate-spin'></div>
            <p className='mt-4 text-gray-600'>Verifying your payment, please wait...</p>
        </div>
    );
};

export default Verify;
