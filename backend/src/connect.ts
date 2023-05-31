import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export default async function connect(){
   try{
    return await mongoose.connect(process.env.MONGODB_URI!)
   }catch(e){
    console.log(e);
   }

}