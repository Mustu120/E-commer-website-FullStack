import React, { useContext, useMemo } from "react";
import { ShopContext } from "../context/ShopContext";

const CartTotal = () => {
  const { products, cartItems, currency } = useContext(ShopContext);

  // Calculate subtotal using useMemo for performance
  const subtotal = useMemo(() => {
    let total = 0;

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        const quantity = cartItems[itemId][size];
        if (quantity > 0) {
          const product = products.find((p) => p._id === itemId);
          if (product) {
            total += product.price * quantity;
          }
        }
      }
    }
    return total;
  }, [cartItems, products]);

  const shippingFee = subtotal > 0 ? 30 : 0; // Example: flat $10 fee
  const total = subtotal + shippingFee;

  return (
    <div className="w-full max-w-md ml-auto border-t pt-6">
      <h2 className="text-lg font-semibold mb-4">CART TOTALS</h2>
      <div className="space-y-3 text-gray-700">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            {currency}
            {subtotal.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span>
            {currency}
            {shippingFee.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between font-semibold text-lg border-t pt-3">
          <span>Total</span>
          <span>
            {currency}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
