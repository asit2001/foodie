import { Router } from "express";
import RestaurantRouter from "./restaurantRouter";
import { searchRouter } from "./search";
import { authRouter } from "./authRouter";
import { cartRouter } from "./cartRouter";
import { addressRouter } from "./addressRouter";

const router = Router();
router.use("/restaurant",RestaurantRouter)
router.use("/user",authRouter);
router.use("/user",cartRouter);
router.use("/user",addressRouter);
router.use(searchRouter);
export {router};