import { Schema, model } from 'mongoose';

const commentSchema = new Schema({
  content: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
  post: { type: Schema.Types.ObjectId, ref: 'Post' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

const commentModel = model('Comment', commentSchema);

export default commentModel;