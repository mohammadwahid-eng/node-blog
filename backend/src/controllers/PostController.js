import Joi from 'joi';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

export const index = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.limit) || 10;

    // Calculate the skip value
    const skip = (currentPage - 1) * itemsPerPage;

    // Get total number of categories
    const totalItems = await Post.countDocuments();

    // Fetch paginated categories from the database
    const categories = await Post.find().skip(skip).limit(itemsPerPage);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return res.status(200).json({
      data: categories,
      meta: {
        totalItems,
        totalPages,
        currentPage,
        itemsPerPage
      }
    });
  } catch(error) {
    next(error);
  }
}

export const show = async (req, res, next) => {
  try {
    const { id: postId } = req.params;

    const post = await Post.findById(postId).populate('user', '-posts').populate('category', '-posts').populate('tags', '-posts');
    if( ! post ) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json(post);

  } catch(error) {
    next(error);
  }
}

export const store = async (req, res, next) => {
  try {
    // input validation
    const { error } = Joi.object({
      title: Joi.string().required().trim(),
      content: Joi.string(),
      thumbnail: Joi.string().uri(),
      status: Joi.string().valid('draft', 'published'),
      category: Joi.string().hex().length(24),
      tags: Joi.array().items(Joi.string().hex().length(24)),
      user: Joi.string().hex().length(24),
    }).validate(req.body);

    if( error ) return res.status(422).json({ message: error.details[0].message });

    const { title, content, thumbnail, status, category, user, tags } = req.body;

    const post = new Post({ title, content, thumbnail, status, user, category, tags });
    await post.save();

    // update associate tables
    await Category.findByIdAndUpdate(category, { $push: { posts: post._id } });
    await User.findByIdAndUpdate(user, { $push: { posts: post._id } });

    if( tags && tags.length ) {
      await Tag.updateMany(
        { _id: { $in: tags } },
        { $push: { posts: post._id } }
      )
    }

    return res.status(201).json(post);
  } catch(error) {
    next(error);
  }
}

export const update = async (req, res, next) => {
  try {
    // input validation
    const { error } = Joi.object({
      title: Joi.string().trim(),
      content: Joi.string(),
      thumbnail: Joi.string().uri(),
      status: Joi.string().valid('draft', 'published'),
      category: Joi.string().hex().length(24),
      tags: Joi.array().items(Joi.string().hex().length(24)),
      user: Joi.string().hex().length(24),
    }).validate(req.body);

    if( error ) return res.status(422).json({ message: error.details[0].message });

    const postId = req.params.id;

    const existingPost = await Post.findById(postId);
    if( ! existingPost ) return res.status(400).json({ message: 'Post not found' });

    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, { new: true, runValidators: true });
    return res.status(200).json(updatedPost);
  } catch(error) {
    next(error);
  }
}

export const destroy = async (req, res, next) => {
  try {
    const { id: postId } = req.params;
    
    const post = await Post.findById(postId);

    // detach post from category
    await Category.updateOne({ _id: post.category._id }, { $pull: { posts: post._id } });

    // detach post from user
    await User.updateOne({ _id: post.user._id }, { $pull: { posts: post._id } });

    // detach post from tags
    await Tag.updateMany({ _id: { $in: post.tags } }, { $pull: { posts: post._id } });

    await post.deleteOne();

    return res.status(204).send();
  } catch(error) {
    next(error);
  }
}

