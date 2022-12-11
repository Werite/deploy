import express from 'express';
const router = express.Router();

import { insertVideoRecURL } from '../controllers/videorecordingsController.js';
import { protect } from '../middlewares/authMiddleware.js';

router.route('/insertvideorecordingurl/:pool_id').post(protect, insertVideoRecURL);


export default router