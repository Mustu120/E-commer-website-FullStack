import mongoose from 'mongoose';

// --- Define the Schema for the User Model ---
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    },
    // ✅ FIX: Changed type to 'Object' to allow nested data for sizes.
    // This now correctly supports a structure like: { itemId: { size: quantity } }
    cartData: {
        type: Object,
        default: {}
    },
}, {
    timestamps: true
});

// --- Create and Export the Mongoose Model ---
const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;
