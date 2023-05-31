import { Router } from "express";
import { AddToCart, getCarts,deleteCart } from "../controllers/CartController";
import { auth } from "../middleware/authMiddleware";
export const cartRouter = Router();
cartRouter.use(auth);
cartRouter.post("/cart",AddToCart)
cartRouter.get("/cart",getCarts)
cartRouter.delete("/cart",deleteCart)