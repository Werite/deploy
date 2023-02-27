import express from "express";
import {
  downVoteVideo,
  getAllDownVotes,
  removeDownvote,
} from "../controllers/downVoteController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/video/:video_id")
  .post(protect, downVoteVideo)
  .get(protect, getAllDownVotes)
  .delete(protect, removeDownvote);

export default router;
