import { Schema, model } from "mongoose";
import { Cart } from "../src/type";

const CartSchema = new Schema<Cart>({
  // menu_id :[{ type: Schema.Types.ObjectId, ref: 'menu' }],
  menus: {
    type: Map,
    of: new Schema({
      quantity: {
        type: Number,
        default: 1,
      },
      menu_id: {
        type: Schema.Types.ObjectId,
        ref: "menu",
      },
    }),
  },
  user_id: { type: Schema.Types.ObjectId, ref: "user" },
  restaurant_id: { type: Schema.Types.ObjectId, ref: "restaurant" },
  ordered:{
    type:Boolean,
    default:false
  }
});
export default model("cart", CartSchema);
