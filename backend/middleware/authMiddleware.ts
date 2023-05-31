import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import KeyValueModel from "../models/KVModel";
import { decodeJWT } from "../src/type";

export async function auth(req:Request,res:Response,next:NextFunction) {
    try {
        let token = req.cookies.jwtToken;
        
        if (!token) {
            return res.status(404).json({error:"token not found"})
        }
        const {key,user_id} =  verify(token,process.env.JWT_SECRET) as decodeJWT
        let isValid = await KeyValueModel.findOne({key:key})
        if (!isValid) {
           return res.status(400).json({error:"invalid token"})
        }
        req.body = {...req.body,user_id:user_id,key}
        next();
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}