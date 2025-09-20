import mongoose from 'mongoose';

// --- Define the Schema for the User Model ---
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"], // Custom error message
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true, // Ensures no two users can have the same email
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    // The user's role determines their permissions in the application.
    // Setting a default value ensures all new sign-ups are standard users.
    role: {
        type: String,
        enum: ['user', 'admin'], // Restricts the role to only these two values
        default: 'user',
    },
    // Using a Mongoose Map is better than a generic Object.
    // It's structured for key-value pairs, where the key is the item ID (String)
    // and the value is the quantity (Number).
    cartData: {
        type: Map,
        of: Number,
        default: {}
    },
}, {
    // --- Schema Options ---
    // This option automatically adds `createdAt` and `updatedAt` fields
    // to your documents, which is essential for tracking record history.
    timestamps: true
});

// --- Create and Export the Mongoose Model ---
// This line prevents Mongoose from redefining the model if it already exists,
// which is a common issue in development with tools like nodemon.
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
