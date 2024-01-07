import express from 'express';
import { uploadFile } from '../utils/uploadFile.js';
import { uploadFileHandler } from '../controllers/uploadFile.js';

const fileUploadRouter = express.Router();

// Set up a route to handle file uploads
fileUploadRouter.post('/', uploadFile.single('file'), uploadFileHandler);

export default fileUploadRouter;
