import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js';
// --- Stripe Code Removed ---

/**
 * @desc    Place a new order (COD only)
 * @route   POST /api/order/place
 * @access  Private (User)
 */
const placeOrder = async (req, res) => {
    try {
        const { items, amount, address, paymentMethod } = req.body;

        // Only allow Cash on Delivery
        if (paymentMethod !== "cod") {
            return res.status(400).json({ success: false, message: "Invalid payment method. Only Cash on Delivery is supported." });
        }

        const newOrder = new orderModel({
            userId: req.user.id,
            items: items,
            amount: amount,
            address: address,
            paymentMethod: "COD",
            payment: false // For COD, payment is confirmed upon delivery
        });
        
        await newOrder.save();
        
        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.user.id, { cartData: {} });
        
        res.json({ success: true, message: "Order Placed Successfully (COD)" });

    } catch (error) {
        console.log("Order Placement Error:", error);
        res.status(500).json({ success: false, message: "An error occurred while placing the order." });
    }
};

/**
 * @desc    Fetch all orders for the currently logged-in user
 * @route   GET /api/order/userorders
 * @access  Private (User)
 */
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Fetch User Orders Error:", error);
        res.status(500).json({ success: false, message: "Error fetching user orders" });
    }
};

/**
 * @desc    Fetch all orders for the admin panel
 * @route   GET /api/order/list
 * @access  Private (Admin)
 */
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({}).sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Fetch All Orders Error:", error);
        res.status(500).json({ success: false, message: "Error fetching all orders" });
    }
};

/**
 * @desc    Update an order's status from the admin panel
 * @route   PATCH /api/order/status
 * @access  Private (Admin)
 */
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Order Status Updated" });
    } catch (error) {
        console.log("Update Status Error:", error);
        res.status(500).json({ success: false, message: "Error updating status" });
    }
};

// --- Stripe functions verifyOrder and stripeWebhook removed ---

export {
    placeOrder,
    userOrders,
    allOrders,
    updateStatus
};