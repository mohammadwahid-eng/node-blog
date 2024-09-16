import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6, select: false },
  photo: { type: String, required: false },
  is_admin: { type: Boolean, default: false },
  posts: [ { type: Schema.Types.ObjectId, ref: 'Post' } ]
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if(this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const userModel = model('User', userSchema);

export default userModel;