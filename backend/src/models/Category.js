import { Schema, model } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true, unique: true, trim: true },
  description: { type: String },
  image: { type: String },
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, { timestamps: true });

const categoryModel = model('Category', categorySchema);

export default categoryModel;