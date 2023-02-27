import express from "express";
import multer from "multer";
const upload = multer();
const router = express.Router();
import {
  registerUser,
  authUser,
  getUserProfile,
  getMyPosts,
  addMyBio,
  uploadProfile,
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/login").post(authUser);
router.route("/:id").get(protect, getUserProfile);
router
  .route("/uploads")
  .patch(protect, upload.single("profile_pic"), uploadProfile);

router
  .route("/")
  .post(registerUser)
  .get(protect, getMyPosts)
  .patch(protect, addMyBio);

export default router;
