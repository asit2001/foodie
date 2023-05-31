import { Router } from "express";
import { auth } from "../middleware/authMiddleware";
import { addAddress, deleteAddress, getAddress } from "../controllers/addressController";
export const addressRouter = Router();
addressRouter.use(auth);
addressRouter.post("/address",addAddress);
addressRouter.get("/address",getAddress);
addressRouter.delete("/address",deleteAddress);