import { Request, Response } from "express";
import mongoose from "mongoose";
import RestaurantModel from "../models/restaurantModel";
import MenuModel from "../models/MenuModel";
import { verify } from "jsonwebtoken";
import KeyValueModel from "../models/KVModel";
import userModel from "../models/userModel";
interface Props {
  city: string;
  sort: {};
  page: number;
  limit: number;
}

async function getRestaurantsData({ city, limit, page, sort }: Props) {
  const query = {
    cost: { $gte: 20 },
    city: city,
  };
  const totalPromise = RestaurantModel.countDocuments(query).exec();
  const dataPromise = RestaurantModel.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate({ path: "menu", model: MenuModel })
    .lean();

  const [total, data] = await Promise.all([totalPromise, dataPromise]);

  return { data, total };
}

export async function getRestaurantsByCity(req: Request, res: Response) {
  let page = Number(req.query.page) || 1,
    limit = 50,
    sort = req.body.sort,
    city = req.params.city;
  let ValidationError = new RestaurantModel({
    city: city,
  }).validateSync();
  if (ValidationError) {
    return res.status(404).json({ error: ValidationError.message });
  }
  try {
    res.json(await getRestaurantsData({ city, limit, page, sort }));
  } catch (e) {
    res.status(502).json({ error: e.message });
  }
}

export async function getProductById(req: Request, res: Response) {
  let token = req.cookies.jwtToken;
  let id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "id not found" });
  }
  try {
    const product = await RestaurantModel.findById(id).populate({
      path: "menu",
      model: MenuModel,
    });

    if (product === null) {
      return res.status(400).json({ error: "invalid id" });
    }
    
    if (token) {
      let { user_id, key } = verify(token, process.env.JWT_SECRET) as {
        user_id: string;
        name: string;
        key: string;
      };
      let isValid = await KeyValueModel.findOne({ key: key });
      if (!isValid) {
        return res.status(400).json({ error: "invalid token" });
      }
      const isPresent = await userModel.findOne({
        _id: new mongoose.Types.ObjectId(user_id),
        favorite:  product.id
      });
      return res.json({...product.toObject(),favorite:!!isPresent})
    }
    res.json(product);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}

