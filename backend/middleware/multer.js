import multer from "multer";

// Switched to memoryStorage to handle files as buffers in memory
// This is more efficient and reliable for cloud uploads
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;