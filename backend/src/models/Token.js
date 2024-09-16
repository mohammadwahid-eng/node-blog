import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

const tokenModel = model('Token', tokenSchema);

export default tokenModel;