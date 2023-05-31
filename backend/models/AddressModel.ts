import {Schema,model} from "mongoose"
import { Address } from "../src/type"

const AddressSchema = new Schema<Address>({
    address:{
        type:String,
        required:true
    },
    address_type:{
        type:String,
        enum:["Office","Home","Others"],
        required:true
    },
    flat_number:{
        type:String,
        required:true
    },
    landmark:{
        type:String,
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
})
const AddressModel = model("address",AddressSchema);
export default AddressModel;