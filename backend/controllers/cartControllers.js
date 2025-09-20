// controllers/cartControllers.js (Corrected)
import userModel from "../models/userModel.js";

/**
 * @desc    Add an item to the logged-in user's cart.
 */
const addToCart = async (req, res) => {
    try {
        // ✅ FIX: Get the user ID from req.user.id
        const userId = req.user.id; 
        const { itemId, size } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        let cartData = userData.cartData || {};

        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }
        cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
        
        userData.markModified('cartData');
        await userData.save();

        res.json({ success: true, message: "Item added to cart." });

    } catch (error) {
        console.error("Error in addToCart:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

/**
 * @desc    Remove one instance of an item from the cart.
 */
const removeFromCart = async (req, res) => {
    try {
        // ✅ FIX: Get the user ID from req.user.id
        const userId = req.user.id;
        const { itemId, size } = req.body;

        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        let cartData = userData.cartData || {};

        if (cartData[itemId] && cartData[itemId][size] > 0) {
            cartData[itemId][size] -= 1;
            if (cartData[itemId][size] === 0) {
                delete cartData[itemId][size];
            }
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            return res.status(400).json({ success: false, message: "Item not in cart." });
        }
        
        userData.markModified('cartData');
        await userData.save();
        
        res.json({ success: true, message: "Item removed from cart." });

    } catch (error) {
        console.error("Error in removeFromCart:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

/**
 * @desc    Get the logged-in user's entire cart.
 */
const getUserCart = async (req, res) => {
    try {
        // ✅ FIX: Get the user ID from req.user.id
        const userId = req.user.id;
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        res.json({ success: true, cartData: userData.cartData || {} });
    } catch (error) {
        console.error("Error in getUserCart:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};

export { addToCart, removeFromCart, getUserCart };