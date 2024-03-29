import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderItems,
  getOrders,
  getMyOrders,
  updatePaystack,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/updatePastack").post(protect, updatePaystack);
router.route("/:id").get(protect, getOrderItems);
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);
export default router;
