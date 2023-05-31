import { Request, Response } from "express";
import CartModel from "../models/CartModel";

import MenuModel from "../models/MenuModel";
import RestaurantModel from "../models/restaurantModel";

export async function AddToCart(req: Request, res: Response) {
  try {
    const { user_id, menu_id, restaurant_id } = req.body;
    if (!(await isMenuPresentInRestaurant(restaurant_id, menu_id))) {
      return res
        .status(404)
        .json({ error: "invalid menu_id or restaurant_id" });
    }
    const existingCart = await CartModel.findOne({ user_id: user_id,ordered:false });
    let carts: any;
    if (existingCart) {
      if (existingCart.restaurant_id == restaurant_id) {
        let quantity = existingCart.menus.get(menu_id)?.quantity || 0;
        existingCart.menus.set(menu_id, {
          menu_id,
          quantity: quantity + 1,
        });
        carts = await existingCart.save();
      } else {
        existingCart.menus.clear();
        existingCart.menus.set(menu_id, {
          menu_id,
          quantity: 1,
        });
        existingCart.restaurant_id = restaurant_id;
        carts = await existingCart.save();
      }
    } else {
      carts = await CartModel.create({
        menus: new Map().set(menu_id, { menu_id, quantity: 1 }),
        restaurant_id: restaurant_id,
        user_id: user_id,
      });
    }
    if (!carts) {
      return res.status(500).json({ error: "something went wrong" });
    }
    carts = await carts.populate([{
      path: "menus.$*.menu_id",
      model: MenuModel,
    },{
      path:"restaurant_id",
      model:RestaurantModel,
      select:"img cuisine name"
    }])

    res.status(200).json(carts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
}
export async function getCarts(req: Request, res: Response) {
  try {
    const { user_id } = req.body;

    const carts = await CartModel.findOne({ user_id: user_id,ordered:false }).populate([{
      path: "menus.$*.menu_id",
      model: MenuModel,
    },{
      path:"restaurant_id",
      model:RestaurantModel,
      select:"img cuisine name"
    }])
    res.json(carts);
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}
export async function deleteCart(req: Request, res: Response) {
  try {
    const { user_id, menu_id, restaurant_id } = req.body;
    if (!(await isMenuPresentInRestaurant(restaurant_id, menu_id))) {
      return res
        .status(404)
        .json({ error: "invalid menu_id or restaurant_id" });
    }
    const existingCart = await CartModel.findOne({ user_id: user_id,ordered:false });
    if (existingCart) {
      const { quantity } = existingCart.menus.get(menu_id);
      if (quantity == 1) {
        existingCart.menus.delete(menu_id);
      } else {
        existingCart.menus.set(menu_id, {
          menu_id: menu_id,
          quantity: quantity - 1,
        });
      }
      await existingCart.populate([{
        path: "menus.$*.menu_id",
        model: MenuModel,
      },{
        path:"restaurant_id",
        model:RestaurantModel,
        select:"img cuisine name"
      }])
      const carts = await existingCart.save();
      return res.json(carts);
    }
    res.status(404).json({ error: "no user found" });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
}

export async function getMenu(id: string) {
  const menu = await MenuModel.findById(id);
  return menu;
}

async function isMenuPresentInRestaurant(
  restaurant_id: string,
  menu_id: string
): Promise<boolean> {
  const restaurant = await RestaurantModel.findOne({
    _id: restaurant_id,
    menu: { $in: [menu_id] },
  });
  return !!restaurant;
}
