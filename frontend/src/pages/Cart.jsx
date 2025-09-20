import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X } from 'lucide-react';

const Cart = () => {
    // Get the 'navigate' function from the context
    const { products, cartItems, removeFromCart, getCartAmount, getCartCount, navigate } = useContext(ShopContext);

    // Create a function to handle the checkout process
    const proceedToCheckout = () => {
        // ✅ CHANGED: The navigation path is now '/place-order'
        navigate('/place-order');
    };

    return (
        <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">YOUR CART</h1>
            <hr className="mb-8" />

            {getCartCount() === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    <div className="hidden md:grid grid-cols-6 gap-4 text-left font-semibold text-gray-600 mb-4">
                        <p className="col-span-2">Product</p>
                        <p>Size</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Remove</p>
                    </div>

                    {products.map((product) => {
                        if (cartItems[product._id]) {
                            return Object.keys(cartItems[product._id]).map((size) => {
                                const quantity = cartItems[product._id][size];
                                if (quantity > 0) {
                                    return (
                                        <div key={`${product._id}-${size}`}>
                                            <div className="grid grid-cols-6 gap-4 items-center py-4">
                                                <div className="col-span-2 flex items-center gap-4">
                                                    <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover" />
                                                    <p className="font-medium">{product.name}</p>
                                                </div>
                                                <p>{size}</p>
                                                <p>₹{product.price}</p>
                                                <div className="border border-gray-300 w-16 text-center py-1.5">
                                                    {quantity}
                                                </div>
                                                <X
                                                    onClick={() => removeFromCart(product._id, size)}
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                            <hr />
                                        </div>
                                    );
                                }
                                return null;
                            });
                        }
                        return null;
                    })}

                    <div className="mt-12 flex justify-end">
                        <div className="w-full max-w-sm">
                            <h2 className="text-2xl font-bold mb-4">Cart Totals</h2>
                            <div className="flex justify-between py-2 border-b">
                                <p>Subtotal</p>
                                <p>₹{getCartAmount()}</p>
                            </div>
                            <div className="flex justify-between py-2 border-b">
                                <p>Shipping Fee</p>
                                <p>Free</p>
                            </div>
                            <div className="flex justify-between py-2 font-bold">
                                <p>Total</p>
                                <p>₹{getCartAmount()}</p>
                            </div>
                            <button onClick={proceedToCheckout} className="w-full bg-black text-white py-3 mt-6">
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;