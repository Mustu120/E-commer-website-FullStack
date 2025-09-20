import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState('');
    const [loading, setLoading] = useState(false); // **CHANGED: Added loading state**
    const navigate = useNavigate();

    const currency = '₹';
    const deliveryFee = 50;

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
        navigate("/");
        toast.info("You have been logged out.");
    };

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/product/list`);
                if (response.data.success) {
                    setProducts(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }

            const savedToken = localStorage.getItem('token');
            if (savedToken) {
                setToken(savedToken);
            }
        };
        loadInitialData();
    }, []);
    
    useEffect(() => {
        const loadCartData = async () => {
            if (token) {
                try {
                    const cartResponse = await axios.get(`${backendUrl}/api/cart`, { headers: { Authorization: `Bearer ${token}` } });
                    if (cartResponse.data.success) {
                        setCartItems(cartResponse.data.cartData);
                    }
                } catch (error) {
                    console.error("Failed to load user cart.", error);
                    if (error.response && error.response.status === 401) {
                        logout();
                    }
                }
            }
        };
        loadCartData();
    }, [token]);

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size.");
            return;
        }
        const prevCart = { ...cartItems };
        setCartItems((prev) => {
            const item = { ...(prev[itemId] || {}) };
            item[size] = (item[size] || 0) + 1;
            return { ...prev, [itemId]: item };
        });
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                setCartItems(prevCart);
            }
        }
    };

    const removeFromCart = async (itemId, size) => {
        const prevCart = { ...cartItems };
        setCartItems((prev) => {
            const item = { ...(prev[itemId] || {}) };
            if (item[size] > 0) item[size] -= 1;
            if (item[size] === 0) delete item[size];
            if (Object.keys(item).length === 0) {
                const newCart = { ...prev };
                delete newCart[itemId];
                return newCart;
            }
            return { ...prev, [itemId]: item };
        });
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/remove`, { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                setCartItems(prevCart);
            }
        }
    };
    
    const clearCart = () => {
        setCartItems({});
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            const itemInfo = products.find((product) => product._id === itemId);
            if (itemInfo) {
                for (const size in cartItems[itemId]) {
                    const quantity = cartItems[itemId][size];
                    if (quantity > 0) {
                        totalAmount += itemInfo.price * quantity;
                    }
                }
            }
        }
        return totalAmount;
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size];
            }
        }
        return totalCount;
    };
    
    const placeOrder = async (orderData) => {
        if (token) {
            setLoading(true); // **CHANGED: Set loading true before API call**
            try {
                const response = await axios.post(`${backendUrl}/api/order/place`, orderData, { headers: { Authorization: `Bearer ${token}` } });
                if (response.data.success) {
                    const { session_url } = response.data;
                    if (session_url) {
                        // For Stripe, redirecting will clear the context, so no need to call clearCart() here
                        window.location.replace(session_url);
                    } else {
                        toast.success("Order placed successfully!");
                        navigate("/orders");
                        clearCart(); // **CHANGED: Clear cart only after successful COD order**
                    }
                } else {
                    toast.error(response.data.message || "Error placing order");
                }
            } catch (error) {
                console.error("Error during order placement:", error);
                toast.error("An error occurred while placing your order.");
            } finally {
                setLoading(false); // **CHANGED: Set loading false after API call completes**
            }
        } else {
            toast.error("You must be logged in to place an order.");
            navigate('/login');
        }
    };

    const contextValue = {
        products, cartItems, token, setToken,
        loading, // **CHANGED: Export loading state**
        logout, addToCart, removeFromCart,
        getCartAmount, getCartCount, backendUrl,
        navigate, deliveryFee, currency, clearCart,
        placeOrder
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;