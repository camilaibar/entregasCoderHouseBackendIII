import { Router } from "express";
import hbsRouter from "./v1/hbs.router.js";
import userRouter from "./v1/user.router.js";
import sessionRouter from "./v1/session.router.js";
import productRouter from "./v1/product.router.js";
import cartRouter from "./v1/cart.router.js";
import purchaseRouter from "./v1/purchase.router.js";
import errorHandler from "../middlewares/errorHandler.js";

const router = Router();

router.get("/", (req, res, next) => {
  return res.send("Welcome to my backend");
});

router.use("/hbs", hbsRouter);
router.use("/api/v1/user", userRouter);
router.use("/api/v1/session", sessionRouter);
router.use("/api/v1/products", productRouter);
router.use("/api/v1/carts", cartRouter);
router.use("/api/v1/purchase", purchaseRouter);
router.use(errorHandler); // Add the error handler at the end to run all routes

export default router;
