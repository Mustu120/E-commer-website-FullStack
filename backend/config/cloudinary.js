import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config'; // Ensures environment variables are loaded

// An asynchronous function to configure the Cloudinary SDK
const connectCloudinary = async () => {
  try {
    // It's crucial to verify that all required environment variables are available.
    // If any are missing, the application cannot function correctly.
    if (
      !process.env.CLOUDINARY_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_SECRET_KEY
    ) {
      // If any variable is missing, throw an error to be caught by the catch block.
      throw new Error('Missing Cloudinary Environment Variables. Please check your .env file.');
    }

    // Configure the Cloudinary instance with your credentials.
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET_KEY,
    });

    // Log a success message to the console upon successful configuration.
    console.log('Cloudinary Connected Successfully');

  } catch (error) {
    // If an error occurs (like missing variables), it will be caught here.
    console.error('Failed to connect to Cloudinary:', error.message);

    // Exit the application process with a failure code (1).
    // This is a good practice for critical service connections.
    process.exit(1);
  }
};

// Export the function to be used in other parts of your application.
export default connectCloudinary;