// routes/cartRoute.js

import express from 'express';
import { addToCart, removeFromCart, getUserCart } from '../controllers/cartControllers.js';
import authUser from '../middleware/auth.js'; // Corrected middleware path

const cartRouter = express.Router();

// Apply the authUser middleware to every cart route
// This ensures only a logged-in user can access their own cart

// Route to add an item to the cart
cartRouter.post("/add", authUser, addToCart);

// Route to remove an item from the cart
cartRouter.post("/remove", authUser, removeFromCart);

// Route to get the user's cart data
// Changed to a GET request for semantic correctness
cartRouter.get("/", authUser, getUserCart);

export default cartRouter;