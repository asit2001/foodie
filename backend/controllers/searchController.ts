import {Request,Response} from "express";
import RestaurantModel from "../models/restaurantModel";
import { City } from "../src/type";


export async function search(req:Request,res:Response){
    try {
      let query = req.query.query as string;
    let city = req.query.city as City;
    let ValidationError = new RestaurantModel({
        city: city,
      }).validateSync();
      if (ValidationError) {
        return res.status(404).json({ error: ValidationError.message });
      }
      if (!city || !query) {
        return res.status(404).json({error:"all fields required"})
      }
      const restaurants = await RestaurantModel.aggregate([
        {
          $lookup: {
            from: 'menus',
            localField: 'menu',
            foreignField: '_id',
            as: 'menu',
          },
        },
        {
          $match: {
            'menu.product__name': { $regex: query, $options: 'i' },
            'city':city
          },
        },
        {
          $limit: 50,
        },
      ]);

    res.json(restaurants)
    } catch (error) {
      res.status(500).json({error:error.message})
    }
}