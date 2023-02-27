import express from "express";

const router = express.Router();

import {
  getVideoRecording,
  insertVideoRecURL,
} from "../controllers/videoRecordingController.js";
import { protect } from "../middlewares/authMiddleware.js";

router
  .route("/insertVideoRecordingUrl/:pool_id")
  .post(protect, insertVideoRecURL);
router.route("/insertVideoRecordingUrl").get(protect, getVideoRecording);

export default router;
