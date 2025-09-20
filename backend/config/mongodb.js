import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // The await keyword will pause execution until the connection is established
    const conn = await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);

    // Log a success message to the console, including the host it connected to
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs, log the error message
    console.error(`Error: ${error.message}`);

    // Exit the process with a failure code (1)
    process.exit(1);
  }
};

export default connectDB;