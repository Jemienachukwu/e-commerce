import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderItems,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderItems);
export default router;
