import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import axios from 'axios';

const PlaceOrder = () => {
    // ADD placeOrder to the context destructuring
    const { products, cartItems, getCartAmount, deliveryFee, loading, clearCart, placeOrder } = useContext(ShopContext);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const [data, setData] = useState({
        firstName: "", lastName: "", email: "", street: "",
        city: "", state: "", zipcode: "", country: "", phone: ""
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);
    
    const placeOrderHandler = async (event) => {
        event.preventDefault();
        const paymentMethod = new FormData(event.target).get('paymentMethod');

        if (getCartAmount() === 0) return toast.error("Your cart is empty.");
        if (!paymentMethod) return toast.error("Please select a payment method.");

        let orderItems = [];
        products.forEach((product) => {
            if (cartItems[product._id]) {
                for (const size in cartItems[product._id]) {
                    if (cartItems[product._id][size] > 0) {
                        let itemInfo = { ...product };
                        itemInfo.quantity = cartItems[product._id][size];
                        itemInfo.size = size;
                        orderItems.push(itemInfo);
                    }
                }
            }
        });

        const orderData = {
            address: data,
            items: orderItems,
            amount: getCartAmount() + deliveryFee,
            paymentMethod: paymentMethod
        };
        
        if (paymentMethod === "razorpay") {
            try {
                const response = await axios.post('http://localhost:4000/api/order/create-razorpay-order', 
                    { amount: orderData.amount }, 
                    { headers: { token } }
                );
                
                const razorpayOrder = response.data.order;
                const options = {
                    key: "YOUR_RAZORPAY_KEY_ID", 
                    amount: razorpayOrder.amount,
                    currency: "INR",
                    name: "Your Brand Name",
                    description: "Order Payment",
                    image: assets.logo,
                    order_id: razorpayOrder.id,
                    handler: async function (response) {
                        const verificationData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            orderData
                        };

                        const verifyResponse = await axios.post('http://localhost:4000/api/order/verify-payment', verificationData, { headers: { token } });
                        
                        if (verifyResponse.data.success) {
                            toast.success(verifyResponse.data.message);
                            clearCart();
                            navigate('/myorders');
                        } else {
                            toast.error("Payment verification failed. Please try again.");
                        }
                    },
                    prefill: {
                        name: `${data.firstName} ${data.lastName}`,
                        email: data.email,
                        contact: data.phone
                    },
                    notes: {
                        address: "Your Company Address"
                    },
                    theme: {
                        color: "#000000"
                    }
                };
                const rzp = new window.Razorpay(options);
                rzp.open();
            } catch (error) {
                console.error("Razorpay Error:", error);
                toast.error("Failed to initiate Razorpay payment.");
            }
        }
        else if (paymentMethod === "cod") {
            // USE the placeOrder function from context for COD
            await placeOrder(orderData);
        }
    };
    
    useEffect(() => {
        if (!loading && getCartAmount() === 0) {
            navigate('/');
        }
    }, [getCartAmount, navigate, loading]);

    return (
        <form onSubmit={placeOrderHandler} className="flex flex-col sm:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] px-4 md:px-8 lg:px-12">
            <div className="w-full max-w-[500px]">
                <Title text1="DELIVERY" text2="INFORMATION" />
                <div className="flex flex-col gap-4 mt-10">
                    <div className="flex gap-3">
                        <input type="text" name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder="First name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
                        <input type="text" name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder="Last name" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
                    </div>
                    <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder="Email address" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
                    <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
                    <div className="flex gap-3">
                        <input type="text" name="city" onChange={onChangeHandler} value={data.city} placeholder="City" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
                        <input type="text" name="state" onChange={onChangeHandler} value={data.state} placeholder="State" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
                    </div>
                    <div className="flex gap-3">
                        <input type="text" name="zipcode" onChange={onChangeHandler} value={data.zipcode} placeholder="Zipcode" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
                        <input type="text" name="country" onChange={onChangeHandler} value={data.country} placeholder="Country" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
                    </div>
                    <input type="tel" name="phone" onChange={onChangeHandler} value={data.phone} placeholder="Phone" className="border border-gray-300 rounded py-1.5 px-3.5 w-full" required />
                </div>
            </div>
            <div className="w-full max-w-[500px]">
                <CartTotal />
                <div className="mt-12">
                    <Title text1="PAYMENT" text2="METHOD" />
                    <div className="flex flex-col lg:flex-row gap-3 mt-4">
                        <label htmlFor="razorpay" className="flex items-center gap-3 border p-2 px-3 rounded-md w-full cursor-pointer has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                            <input type="radio" id="razorpay" name="paymentMethod" value="razorpay" className="w-4 h-4 accent-green-500" />
                            <img src={assets.razorpay_logo} alt="Razorpay" className="w-20" />
                        </label>
                        <label htmlFor="cod" className="flex items-center gap-3 border p-2 px-3 rounded-md w-full cursor-pointer has-[:checked]:border-green-500 has-[:checked]:bg-green-50">
                            <input type="radio" id="cod" name="paymentMethod" value="cod" className="w-4 h-4 accent-green-500" />
                            <p className="text-gray-700 font-medium text-sm">CASH ON DELIVERY</p>
                        </label>
                    </div>
                </div>
                <div className="w-full mt-8">
                    <button type="submit" disabled={loading} className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed">
                        {loading ? 'Processing...' : 'PLACE ORDER'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;