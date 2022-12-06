const Joi = require('joi');
const { Category } = require('../models');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const userSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(6).required(),
  image: Joi.string(),
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number().required()).required(),
});

const BAD_REQUEST = 400;

const validateLoginRequest = ({ body }, res, next) => {
  const { error } = loginSchema.validate(body);
  if (error) {
    return res
      .status(BAD_REQUEST)
      .json({ message: 'Some required fields are missing' });
  }
  next();
};

const validateCategoryRequest = ({ body }, res, next) => {
  const { error } = categorySchema.validate(body);
  if (error) {
    return res.status(BAD_REQUEST).json({ message: '"name" is required' });
  }
  next();
};

const validateUserRequest = ({ body }, res, next) => {
  const { error } = userSchema.validate(body);
  if (error) {
    const { details } = error;
    const [detail] = details;
    return res.status(BAD_REQUEST).json({ message: detail.message });
  }
  next();
};

const validatePostRequest = async ({ body }, res, next) => {
  const categories = await Category.findAll({ attributes: ['id'] });
  const { categoryIds } = body;
  const idsInTheDb = [];
  categories.forEach((category) => idsInTheDb.push(category.dataValues.id));
  const categoriesExist = categoryIds.every((category) => idsInTheDb.includes(category));
  if (!categoriesExist) {
    return res.status(BAD_REQUEST).json({ message: 'one or more "categoryIds" not found' });
  }
  const { error } = postSchema.validate(body);
  if (error) {
    const { details } = error;
    const [detail] = details;
    if (detail.type === 'array.includesRequiredUnknowns') {
      return res.status(BAD_REQUEST).json({ message: 'one or more "categoryIds" not found' });
    }
    return res.status(BAD_REQUEST).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = {
  validateLoginRequest,
  validateCategoryRequest,
  validateUserRequest,
  validatePostRequest,
};
