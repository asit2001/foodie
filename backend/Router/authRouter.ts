import { Router } from "express";
import { addFavorite, deleteFavorite, getFavorite, registerUser,userLogin, userLogout } from "../controllers/userController";
import { auth } from "../middleware/authMiddleware";
import { addOrder, getOrders } from "../controllers/OrderController";

export const authRouter = Router();
authRouter.post("/signup",registerUser);
authRouter.post("/login",userLogin);
authRouter.delete("/logout",auth, userLogout);
authRouter.get("/favorite",auth,getFavorite)
authRouter.post("/favorite",auth,addFavorite)
authRouter.delete("/favorite",auth,deleteFavorite)
authRouter.post("/order",auth,addOrder)
authRouter.get("/order",auth,getOrders)