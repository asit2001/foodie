import {Schema,model} from "mongoose"
import { Order } from "../src/type"

const OrderSchema = new Schema<Order>({
    cart_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"cart"
    },
    user_id:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    status:{
        type:String,
        enum:["fulfilled","reject","conformed","pending"],
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const OrderModel = model("order",OrderSchema);
export default OrderModel