import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderItems,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems);
router.route("/:id").get(protect, getOrderItems);
router.route("/:id/pay").get(protect, updateOrderToPaid);
export default router;
