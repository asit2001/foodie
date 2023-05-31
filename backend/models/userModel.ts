import { Schema, model } from "mongoose";
import { User } from "../src/type";

const userSchema = new Schema<User>({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: String,
  favorite: [{ type: Schema.Types.ObjectId, ref: "Restaurant", unique: true }],
});
export default model("user", userSchema);
