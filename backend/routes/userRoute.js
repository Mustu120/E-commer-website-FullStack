import express from 'express';
import { loginUser, registerUser, adminLogin } from '../controllers/userController.js';

// Create a new router instance from Express
const userRouter = express.Router();

// --- Define API Routes ---

// Route for registering a new user
// Maps the HTTP POST request on '/register' to the registerUser controller function
userRouter.post('/register', registerUser);

// Route for logging in a user
// Maps the HTTP POST request on '/login' to the loginUser controller function
userRouter.post('/login', loginUser);

// Route for an administrator to log in
// Maps the HTTP POST request on '/admin' to the adminLogin controller function
userRouter.post('/admin', adminLogin);

// Export the router to be used in the main server file (e.g., server.js)
export default userRouter;
