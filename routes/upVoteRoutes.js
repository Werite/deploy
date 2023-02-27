import express from "express";
import {
  getAllUpVotes,
  removeUpvote,
  UpVoteVideo,
} from "../controllers/UpvoteController.js";

const router = express.Router();

import { protect } from "../middlewares/authMiddleware.js";

router
  .route("/video/:video_id")
  .post(protect, UpVoteVideo)
  .get(protect, getAllUpVotes)
  .delete(protect, removeUpvote);

export default router;
