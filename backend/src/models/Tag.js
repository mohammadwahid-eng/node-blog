import { Schema, model } from 'mongoose';

const tagSchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

const tagModel = model('Tag', tagSchema);

export default tagModel;