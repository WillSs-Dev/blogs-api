const Joi = require('joi');

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});

const BAD_REQUEST = 400;

const validateLoginRequest = ({ body }, res, next) => {
  const { error } = loginSchema.validate(body);
  if (error) {
    return res.status(BAD_REQUEST).json({ message: 'Some required fields are missing' });
  }
  next();
};

module.exports = { validateLoginRequest };