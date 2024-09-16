import Joi from 'joi';
import Category from '../models/Category.js';

export const index = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.limit) || 10;

    // Calculate the skip value
    const skip = (currentPage - 1) * itemsPerPage;

    // Get total number of categories
    const totalItems = await Category.countDocuments();

    // Fetch paginated categories from the database
    const categories = await Category.find().skip(skip).limit(itemsPerPage);

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

export const store = async (req, res, next) => {

  try {
    // input validation
    const { error } = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      description: Joi.string().required(),
      image: Joi.string().uri(),
    }).validate(req.body);

    if( error ) return res.status(422).json({ message: error.details[0].message });

    const { name } = req.body;

    // checking name existance
    const isCategoryExist = await Category.findOne({ name });
    if( isCategoryExist ) return res.status(400).json({ message: 'Category already exist' });

    const category = new Category(req.body);
    await category.save();

    return res.status(201).json(category);
  } catch(error) {
    next(error);
  }
}

export const update = async (req, res, next) => {
  try {
    // input validation
    const { error } = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      description: Joi.string(),
      image: Joi.string().uri(),
    }).validate(req.body);

    if( error ) return res.status(422).json({ message: error.details[0].message });

    const categoryId = req.params.id;
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });
    if( existingCategory && existingCategory._id.toString() !== categoryId ) return res.status(400).json({ message: 'Category name already exist' });

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true, runValidators: true });

    if( ! updatedCategory ) return res.status(400).json({ message: 'Category not found' });
    
    return res.status(200).json(updatedCategory);
  } catch(error) {
    next(error);
  }
}

export const destroy = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    await Category.findByIdAndDelete(categoryId);
    return res.status(204).send();
  } catch(error) {
    next(error);
  }
}

