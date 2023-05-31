import {Schema,model} from "mongoose";
const restaurantSchema = new Schema({
  name: String,
  rating: Number,
  rating_count: String,
  cost: Number,
  address: String,
  cuisine: String,
  lic_no: String,
  menu: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
  link: String,
  pin: String,
  city: String,
  img: String,
});
const RestaurantModel = model('Restaurant', restaurantSchema);
export default RestaurantModel