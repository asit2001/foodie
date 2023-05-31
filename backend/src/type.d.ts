import { ObjectId } from "mongoose";

export interface Restaurant {
  _id: string;
  name: string;
  rating: number;
  rating_count: RatingCount;
  cost: number;
  address: string;
  cuisine: string;
  lic_no: string;
  menu: [ObjectId];
  link: string;
  pin: string;
  city: City;
  img: string;
}

export type City =
  | "Bangalore"
  | "Chennai"
  | "Cuttack"
  | "Delhi"
  | "Hyderabad"
  | "Kolkata"
  | "Mumbai"
  | "Noida";

export interface Menu {
  price: number;
  veg_or_non_veg: VegOrNonVeg;
  product__name: string;
  img: string;
  restaurant: ObjectId;
}

export type VegOrNonVeg = "Non-veg" | "Veg";

export type RatingCount =
  | "NA"
  | "100+ ratings"
  | "1K+ ratings"
  | "20+ ratings"
  | "500+ ratings"
  | "50+ ratings"
  | "5K+ ratings"
  | "Too Few Ratings";

export interface User {
  name: string;
  email: string;
  password: string;
  address: string;
  cart: [ObjectId];
  orderList: [ObjectId];
  favorite: [ObjectId];
  orders: [ObjectId];
    
}
export interface Cart {
  menus: Map<string, { quantity?: number; menu_id: ObjectId }>;
  user_id: ObjectId;
  restaurant_id: ObjectId;
  ordered:boolean;
}

export interface Order{
  user_id:ObjectId,
  cart_id:ObjectId,
  status:"fulfilled"|"reject"|"conformed"|"pending",
  date:Date
}

export interface Address{
  user_id:ObjectId;
  address:string;
  flat_number:string;
  landmark:string;
  address_type:"Office"|"Home"|"Others"
}

export interface decodeJWT {
  exp: number;
  iat: number;
  key: string;
  name: string;
  user_id: string;
  email: string;
}
