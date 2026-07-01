import express, { urlencoded } from "express";
import cors from "cors";
import seedRoutes from "./src/routes/seedRoutes.js"

import authRoutes from "./src/routes/authRoutes.js"
import categoryRoutes from "./src/routes/categoryRoutes.js"
import productRoutes from "./src/routes/productRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";
const app = express();

// app.use(cors({
//     'origin:process.env.frontend url || localhost'
//     credential:true
// }));
app.use(cors())
app.use(express.json());
app.use(express(urlencoded({ extended: false })));

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", seedRoutes )

app.use(notFound);
app.use(errorHandler);

export default app;