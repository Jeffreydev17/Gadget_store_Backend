import express from "express";
import { createCategory, getCategories, updateCategory, deleteCategory, getCategoryById,} from "../controller/categoryController.js"
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;