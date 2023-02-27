import express from "express";
const router = express.Router();
import {
  getNotifications,
  upadateNotificationsSeen,
} from "../controllers/notificationControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").get(protect, getNotifications);
router.route("/viewed").patch(protect, upadateNotificationsSeen);

export default router;
