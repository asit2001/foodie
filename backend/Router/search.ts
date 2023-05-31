import { Router } from "express";
import { search } from "../controllers/searchController";

export const searchRouter = Router()
searchRouter.get("/search",search)