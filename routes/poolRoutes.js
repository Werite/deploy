import express from "express";
const router = express.Router();
import {
  createPool,
  getPools,
  getMyPools,
} from "../controllers/poolControllers.js";
import {
  acceptPoolRequest,
  createPoolRequest,
  getMyPoolRequests,
  getAllPoolRequests,
  rejectPoolRequest,
} from "../controllers/poolRequestControllers.js";
import { protect } from "../middlewares/authMiddleware.js";

router.route("/").post(protect, createPool).get(protect, getPools);
router.route("/my").get(protect, getMyPools);
router
  .route("/:id/requests")
  .post(protect, createPoolRequest)
  .get(protect, getAllPoolRequests);
router.route("/requests/my").get(protect, getMyPoolRequests);
router.route("/:id/request/accept").patch(protect, acceptPoolRequest);
router.route("/:id/request/reject").patch(protect, rejectPoolRequest);

export default router;
