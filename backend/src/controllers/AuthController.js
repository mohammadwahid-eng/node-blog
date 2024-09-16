import Joi from 'joi';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import Token from '../models/Token.js';

// registration
export const register = async (req, res, next) => {
  try {
    // input validation
    const { error } = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      photo: Joi.string().uri(),
    }).validate(req.body);

    if( error ) return res.status(422).json({ message: error.details[0].message });

    const { email } = req.body;

    // checking email existance
    const isUserExist = await User.findOne({ email });
    if( isUserExist ) return res.status(400).json({ message: 'User already exist' });

    const user = new User(req.body);
    await user.save();

    return res.status(201).json({ message: 'Registration success' });
  } catch(error) {
    next(error);
  }
}

// login
export const login = async (req, res, next) => {
  try {
    // input validation
    const { error } = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }).validate(req.body);

    if( error ) return res.status(422).json({ message: error.details[0].message });

    const { email, password } = req.body;
    
    // checking email existance
    const user = await User.findOne({ email }).select('+password');
    if( ! user || ! await bcrypt.compare(password, user.password) ) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { user: { id: user._id, name: user.name, email, photo: user.photo } }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    const expiresAt = new Date(Date.now() + 3600 * 1000); // 1h from now
    await Token.create({ token, user: user._id, expiresAt });

    return res.status(200).json({ user: payload.user, token });
  } catch(error) {
    next(error);
  }
}

// logout
export const logout = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    await Token.deleteOne({ token });
    return res.status(204).send();
  } catch(error) {
    next(error);
  }
}

