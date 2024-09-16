import { Schema, model } from 'mongoose';

const postSchema = new Schema({
  title: { type: String, trim: true, required: true },
  content: { type: String, trim: true, required: true },
  slug: { type: String, trim: true, unique: true, required: true },
  thumbnail: { type: String, trim: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const postModel = model('Post', postSchema);

export default postModel;