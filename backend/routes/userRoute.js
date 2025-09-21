import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

const userRouter = express.Router();

// Route for registering a new user
userRouter.post('/register', registerUser);

// Route for logging in a user
userRouter.post('/login', loginUser);

// Route for an administrator to log in
userRouter.post('/admin', adminLogin);

export default userRouter;
