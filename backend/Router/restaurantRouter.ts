import {Router} from 'express';
import { getRestaurantsByCity,getProductById } from '../controllers/restaurantController';
import sortBy from '../middleware/sortByMiddleware';
import { auth } from '../middleware/authMiddleware';


const router = Router();
router.use("/city/:city",sortBy);
router.get("/city/:city",getRestaurantsByCity)
router.get("/product/:id",getProductById)


export default router;
 