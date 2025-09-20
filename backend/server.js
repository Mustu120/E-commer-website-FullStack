import express from 'express';
import cors from 'cors';
import 'dotenv/config';

// Import the connection handlers from the config directory
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';

// Import routers
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

// --- App Config ---
const app = express();
const port = process.env.PORT || 4000;

// --- Middleware ---
app.use(express.json());
app.use(cors());

// --- Database & Cloud Service Connections ---
connectDB();
connectCloudinary(); // <-- Re-added the missing Cloudinary connection

// --- API Endpoints ---
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Test route
app.get('/', (req, res) => {
    res.send("🚀 API is Working");
});

app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});