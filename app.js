import express from "express";
import cors from "cors";

import authRoutes from "./src/routes/authRoutes.js"
import categoryRoutes from "./src/routes/categoryRoutes.js"
import productRoutes from "./src/routes/productRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;