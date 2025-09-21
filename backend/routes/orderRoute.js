import express from 'express';
import { 
    placeOrder, 
    userOrders, 
    allOrders, 
    updateStatus
} from '../controllers/orderController.js';
import authUser from '../middleware/auth.js';
import adminAuth from '../middleware/adminAuth.js';

const orderRouter = express.Router();

// User Routes
orderRouter.post('/place', authUser, placeOrder); // For COD
orderRouter.get('/userorders', authUser, userOrders);

// Admin Routes
orderRouter.get('/list', authUser, adminAuth, allOrders);
orderRouter.patch('/status', authUser, adminAuth, updateStatus);

export default orderRouter;
