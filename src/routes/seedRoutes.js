import express from "express";
import { seedProductsCLI, seedProducts } from "../seedController.js";

const router = express.Router();

// Route to seed products
router.post("/seed/products", seedProductsCLI);

// Or with custom count
router.post("/seed/products/:count", async (req, res) => {
  try {
    const count = parseInt(req.params.count) || 10;
    const result = await seedProducts(count);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;