import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check file type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif|webp/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Error: Images Only!'));
  }
}

// Create upload middleware function
const createUploadMiddleware = () => {
  // Configure Cloudinary at runtime
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: (req, file) => {
        // Determine folder based on route
        if (req.baseUrl.includes('projects')) {
          return 'projects';
        } else if (req.baseUrl.includes('services')) {
          return 'services';
        } else if (req.baseUrl.includes('amenities')) {
          return 'amenities';
        }
        return 'uploads';
      },
      format: async (req, file) => {
        // Keep original format or convert to webp for better compression
        const ext = path.extname(file.originalname).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          return ext.slice(1); // Remove the dot
        }
        return 'jpg'; // Default fallback
      },
      public_id: (req, file) => {
        return file.fieldname + '-' + Date.now();
      },
      transformation: [
        { width: 1200, height: 800, crop: 'limit' } // Resize images to max 1200x800
      ]
    }
  });

  return multer({
    storage: storage,
    limits: { fileSize: 5000000 }, // 5MB
    fileFilter: function(req, file, cb) {
      checkFileType(file, cb);
    }
  });
};

// Export the function that creates upload middleware
export default createUploadMiddleware;
