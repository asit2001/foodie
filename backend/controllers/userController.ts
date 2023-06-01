import { Request, Response } from "express";
import {sign} from "jsonwebtoken";
import userModel from "../models/userModel";
import { compare, hash } from "bcryptjs";
import KeyValueModel from "../models/KVModel";
import RestaurantModel from "../models/restaurantModel";

function removedEmailsDots(email:string) {
  if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    let arr =  email.split("@")
    return arr[0].replace(/\./g,"")+"@" + arr[1];
  }
}


export async function registerUser(req: Request, res: Response) {
  let { email, password, name } = req.body as {email:string,password:string, name:string};
  
  if (!email || !password || !name) {
    return res.status(400).json({
      error: "email,password,name are required",
    });
  }
  
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
    return res.status(400).json({
      error: "invalid email address"
    })
  }
  try {
    email = removedEmailsDots(email)
    if(await userModel.exists({email:email})){
      return res.status(400).json({error:"email already exist"})
    }
    let hashPassword = await hash(password, Number(process.env.HASH_ROUND));
    let user = new userModel({ name, email, password: hashPassword });
    await user.validate();
    await user.save();
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

export async function userLogin(req: Request, res: Response) {
  let { email, password } = req.body;
  email = removedEmailsDots(email)
  
  try {
    let user = await userModel.findOne({ email: email });
    if (!user)
    return res.status(404).json({ error: "invalid email or password" });
    
    let isValid = await compare(password,user.password)
    if (!isValid) return res.status(404).json({ error: "invalid email or password" });
    const key = Date.now().toString() + user._id.toString()
    await KeyValueModel.create({key:key,value:true})
    let token =  sign({user_id:user.id,name:user.name,key:key,email:email},process.env.JWT_SECRET,{expiresIn:"1h"})
    if (process.env.NODE_ENV==="development") {
      res.cookie("jwtToken",token,{
        sameSite:"none",
        secure:true,
        maxAge:60 * 60 * 1000
      })
    }else{
      res.cookie("jwtToken",token,{
        sameSite:"strict",
        httpOnly:true,
        secure:true,
        maxAge:60 * 60 * 1000
      })
    }
    res.json({name:user.name,email:email})
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}
export async function addFavorite(req: Request, res: Response){
  const {user_id,restaurant_id} = req.body;
  if (!restaurant_id) {
    return res.status(400).json({error:"restaurant_id is missing"})
  }
  try {
    const restaurant = await RestaurantModel.findById(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({error:"invalid restaurant_id"})
    }
    const data = await  userModel.findByIdAndUpdate(user_id,{
      $addToSet:{favorite:restaurant_id}
    },{new:true}).populate({path:"favorite",model:RestaurantModel}).select("favorite")

    res.json(data.favorite)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}
export async function deleteFavorite(req: Request, res: Response){
  const {user_id,restaurant_id} = req.body;
  if (!restaurant_id) {
    return res.status(400).json({error:"restaurant_id is missing"})
  }
  try {
    const restaurant = await RestaurantModel.findById(restaurant_id);
    if (!restaurant) {
      return res.status(404).json({error:"invalid restaurant_id"})
    }
    const data = await  userModel.findByIdAndUpdate(user_id,{
      $pull:{favorite:restaurant_id}
    },{new:true}).populate({path:"favorite",model:RestaurantModel}).select("favorite")

    res.json(data.favorite)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
}
export async function getFavorite(req: Request, res: Response) {
  const {user_id} = req.body;
  try {
    const data = await userModel.findById(user_id).populate({path:"favorite",model:RestaurantModel}).select("favorite")
    res.json(data.favorite)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function userLogout(req: Request, res: Response) {
  try {
    const {key} = req.body;
    console.log(key);
    
    await KeyValueModel.deleteOne({key:key});
    res.clearCookie("jwtToken").json({message:"user logout successfully"});
  } catch (error) {
    res.status(500).json({error:error.message})
  }
}