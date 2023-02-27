import express from "express";
import {
  createComment,
  getAllComments,
  getReplies,
} from "../controllers/commentController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/video/:video_id")
  .post(protect, createComment)
  .get(protect, getAllComments);
router.route("/video/:video_id/:reply_of_comment_id").get(protect, getReplies);

export default router;
