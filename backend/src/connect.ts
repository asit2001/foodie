import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
export default async function connect(){
   try{
      await mongoose.connect(process.env.MONGODB_URI!)
    console.log("connected")
   }catch(e){
    console.log(e);
   }

}