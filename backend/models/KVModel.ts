import {Schema,model} from "mongoose";

const KeyValueSchema = new Schema({
    key: { type: String, unique: true },
    value: Schema.Types.Mixed,
    createdAt: { type: Date, default: Date.now }
  });
  
  KeyValueSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });
  
  const KeyValueModel = model('KeyValue', KeyValueSchema);
  export default KeyValueModel