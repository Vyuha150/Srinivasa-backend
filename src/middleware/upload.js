import multer from 'multer';
import path from 'path';

// Set storage engine
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    let dest = 'uploads/';
    
    // Determine subdirectory based on field name or route
    // This is a simple implementation, you might want to make it smarter
    if (req.baseUrl.includes('projects')) {
      dest += 'projects/';
    } else if (req.baseUrl.includes('services')) {
      dest += 'services/';
    } else if (req.baseUrl.includes('amenities')) {
      dest += 'amenities/';
    }
    
    cb(null, dest);
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  }
});

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

// Init upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB
  fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
  }
});

export default upload;
