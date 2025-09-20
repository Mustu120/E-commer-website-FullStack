import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        required: true 
    },
    // Renamed for clarity and storing image URLs
    images: { 
        type: [String], 
        required: true 
    },
    // CRITICAL: Storing the public_id for each image to allow for deletion from Cloudinary
    imagePublicIds: {
        type: [String],
        required: true
    },
    category: { 
        type: String, 
        required: true 
    },
    subCategory: { 
        type: String, 
        required: true 
    },
    sizes: { 
        type: [String], 
        required: true 
    },
    bestseller: { 
        type: Boolean,
        default: false
    },
}, { 
    // timestamps: true automatically adds createdAt and updatedAt fields
    timestamps: true 
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;