import express from 'express';
import { addToCart, removeFromCart, getUserCart } from '../controllers/cartControllers.js';
import authUser from '../middleware/auth.js'; // Corrected middleware path

const cartRouter = express.Router();

// Route to add an item to the cart
cartRouter.post("/add", authUser, addToCart);

// Route to remove an item from the cart
cartRouter.post("/remove", authUser, removeFromCart);

// Route to get the user's cart data
cartRouter.get("/", authUser, getUserCart);

export default cartRouter;
