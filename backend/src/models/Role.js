import { Schema, model } from 'mongoose';

const roleSchema = new Schema({
  name: { type: String, required: true, lowercase: true, unique: true, trim: true },
}, { timestamps: true });

const roleModel = model('Role', roleSchema);

export default roleModel;