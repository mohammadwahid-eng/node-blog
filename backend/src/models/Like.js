import { Schema, model } from 'mongoose';

const likeSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const likeModel = model('Like', likeSchema);

export default likeModel;