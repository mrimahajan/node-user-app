import multer from 'multer';
import path from 'path';
import { getAbsolutePath } from './absolutePath.js';

// Set up the storage engine for multer
const storage = multer.diskStorage({
  destination(req, file, cb) {
    // Specify the folder where the uploaded files will be stored
    cb(null, `${getAbsolutePath()}/uploads`);
  },
  filename(req, file, cb) {
    // Set the filename to be unique, you can customize this as needed
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

// Initialize multer with the storage engine and other options
export const uploadFile = multer({ storage });
