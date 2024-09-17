import Joi from 'joi';
import Tag from '../models/Tag.js';

export const index = async (req, res, next) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const itemsPerPage = parseInt(req.query.limit) || 10;

    // Calculate the skip value
    const skip = (currentPage - 1) * itemsPerPage;

    // Get total number of tags
    const totalItems = await Tag.countDocuments();

    // Fetch paginated tags from the database
    const tags = await Tag.find().skip(skip).limit(itemsPerPage);

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return res.status(200).json({
      data: tags,
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
    const { id: tagId } = req.params;

    const tag = await Tag.findById(tagId).populate('posts', '-tags');
    if( ! tag ) return res.status(404).json({ message: 'Tag not found' });
    return res.status(200).json(tag);

  } catch(error) {
    next(error);
  }
}

export const store = async (req, res, next) => {

  try {
    // input validation
    const { error } = Joi.object({
      name: Joi.string().min(3).max(30).required(),
    }).validate(req.body);

    if( error ) return res.status(422).json({ message: error.details[0].message });

    const { name } = req.body;

    // checking name existance
    const isTagExist = await Tag.findOne({ name });
    if( isTagExist ) return res.status(400).json({ message: 'Tag already exist' });

    const tag = new Tag({ name });
    await tag.save();

    return res.status(201).json(tag);
  } catch(error) {
    next(error);
  }
}

export const update = async (req, res, next) => {
  try {
    // input validation
    const { error } = Joi.object({
      name: Joi.string().min(3).max(30).required(),
    }).validate(req.body);

    if( error ) return res.status(422).json({ message: error.details[0].message });

    const tagId = req.params.id;
    const { name } = req.body;

    const existingTag = await Tag.findOne({ name });
    if( existingTag && existingTag._id.toString() !== tagId ) return res.status(400).json({ message: 'Tag name already exist' });

    const updatedTag = await Tag.findByIdAndUpdate(tagId, { name }, { new: true, runValidators: true });

    if( ! updatedTag ) return res.status(400).json({ message: 'Tag not found' });
    
    return res.status(200).json(updatedTag);
  } catch(error) {
    next(error);
  }
}

export const destroy = async (req, res, next) => {
  try {
    const tagId = req.params.id;
    await Tag.findByIdAndDelete(tagId);
    return res.status(204).send();
  } catch(error) {
    next(error);
  }
}

