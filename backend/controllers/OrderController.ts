import { Request, Response } from "express";

import CartModel from "../models/CartModel";
import OrderModel from "../models/OrderModel";
import { Types } from "mongoose";
import RestaurantModel from "../models/restaurantModel";
import MenuModel from "../models/MenuModel";
export async function addOrder(req: Request, res: Response) {
  try {
    const { cart_id, user_id } = req.body;
    if (!cart_id) {
      return res.status(400).json({ error: "cart_id is missing" });
    }
    let cart = await CartModel.findOne({
      _id: new Types.ObjectId(cart_id),
      user_id: user_id,
    });
    if (!cart || cart.ordered) {
      return res.status(404).json({ error: "cart id not found" });
    }
    await OrderModel.create({
      cart_id,
      user_id,
      status: "pending",
    });
    const [ordered] = await Promise.all([
      OrderModel.find({ user_id: user_id }).populate({
        path: "cart_id",
        model: CartModel,
        populate:[{path:"restaurant_id",model:RestaurantModel},{
          path: "menus.$*.menu_id",
          model: MenuModel,
          
        }]
      }),
      cart.updateOne({ $set: { ordered: true } }, { new: true }),
    ]);
    res.json(ordered);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getOrders(req: Request, res: Response) {
  try {
    const { user_id } = req.body;
    let orders = await OrderModel.find({ user_id: user_id }).populate({
      path: "cart_id",
      model: CartModel,
      populate:[{path:"restaurant_id",model:RestaurantModel},{
        path: "menus.$*.menu_id",
        model: MenuModel,
        
      }]
    });
    return res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
