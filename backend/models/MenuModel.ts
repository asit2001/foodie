import { Schema,model } from "mongoose";
import { Menu } from "../src/type";

const menuSchema = new Schema<Menu>({
    price: Number,
    veg_or_non_veg: String,
    product__name: String,
    img: String,
    restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant' }
  });
  
  
  export default model<Menu>("Menu", menuSchema);
  