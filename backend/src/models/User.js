import { Schema, model } from 'mongoose';
import { isEmail } from 'validator';

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, validate: isEmail },
  password: { type: String, required: true, minlength: 6 },
  photo: { type: String, required: false },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  posts: [ { type: Schema.Types.ObjectId, ref: 'Post' } ]
}, { timestamps: true });

const userModel = model('User', userSchema);

export default userModel;