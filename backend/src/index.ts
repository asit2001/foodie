import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser  from "cookie-parser"
import connect from "./connect";
import { router } from "../Router";

connect();
dotenv.config();

const app = express();
app.use(cookieParser());
if(process.env.NODE_ENV==="development"){
  app.use(cors({
    exposedHeaders: ['Cookie',"Authorization"],
    credentials:true,
    origin: 'http://127.0.0.1:3000'
  }));

}
app.use(express.json());
app.use("/api",router);

app.listen(process.env.PORT || 5000, () => {
  console.log(`http://localhost:${process.env.PORT || 5000}`);
});
