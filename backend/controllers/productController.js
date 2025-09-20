// controllers/productController.js

import { v2 as cloudinary } from "cloudinary";
import productModel from '../models/productModel.js';
import streamifier from 'streamifier';

// --- Cloudinary Configuration REMOVED ---
// This is no longer needed here because you already connect to Cloudinary
// once when your main server.js file starts.

// Helper function to upload a buffer to Cloudinary
const uploadFromBuffer = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "product_images" },
            (error, result) => {
                if (result) {
                    resolve(result);
                } else {
                    reject(error);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

// --- Add a Product ---
export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const imageFiles = [
            req.files.image1?.[0],
            req.files.image2?.[0],
            req.files.image3?.[0],
            req.files.image4?.[0]
        ].filter(Boolean);

        if (imageFiles.length === 0) {
            return res.status(400).json({ success: false, message: "At least one image is required." });
        }

        const uploadPromises = imageFiles.map(file => uploadFromBuffer(file.buffer));
        const uploadResults = await Promise.all(uploadPromises);

        const product = new productModel({
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            images: uploadResults.map(result => result.secure_url),
            imagePublicIds: uploadResults.map(result => result.public_id),
        });

        await product.save();

        res.status(201).json({ success: true, message: "Product added successfully.", product });
    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ success: false, message: "Failed to add product." });
    }
};

// --- Remove a Product ---
export const removeProduct = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        if (product.imagePublicIds && product.imagePublicIds.length > 0) {
            await cloudinary.api.delete_resources(product.imagePublicIds);
        }

        await productModel.findByIdAndDelete(req.params.id);

        res.json({ success: true, message: "Product removed successfully." });
    } catch (error) {
        console.error("Error removing product:", error);
        res.status(500).json({ success: false, message: "Failed to remove product." });
    }
};

// --- List All Products ---
export const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, data: products });
    } catch (error) {
        console.error("Error listing products:", error);
        res.status(500).json({ success: false, message: "Failed to fetch products." });
    }
};

// --- Get a Single Product by ID ---
export const getProductById = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        res.json({ success: true, data: product });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ success: false, message: "Server error." });
    }
};