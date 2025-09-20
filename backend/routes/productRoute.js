// routes/productRoute.js (Corrected)
import express from 'express';
import {
    listProducts,
    addProduct,
    removeProduct,
    getProductById
} from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import authUser from '../middleware/auth.js'; // ✅ FIX: Import authUser
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// --- Admin Routes ---
// ✅ FIX: Added authUser before adminAuth for security
productRouter.post('/add', authUser, adminAuth, upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }
]), addProduct);

// ✅ FIX: Added authUser before adminAuth for security
productRouter.delete('/:id', authUser, adminAuth, removeProduct);

// --- Public Routes ---
productRouter.get('/list', listProducts);
productRouter.get('/:id', getProductById);

export default productRouter;