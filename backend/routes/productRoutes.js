import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";

import {
  deleteProduct,
  getProductById,
  getProducts,
} from "../controllers/productController.js";
const router = express.Router();

router.get("/", getProducts);

router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);
export default router;
