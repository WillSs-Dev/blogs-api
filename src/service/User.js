// require('dotenv/config');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const OK = 1;
const ERROR = 0;
const secret = process.env.JWT_SECRET || '$uper$ecretk£y';
const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

const login = async ({ email, password }) => {
  const user = await User.findAll({
    where: {
      email,
      password,
    },
  });
  const token = jwt.sign(
    {
      data: { user: { name: user[0].dataValues.displayName, email, password } },
    },
    secret,
    jwtConfig,
  );
  if (!user.length) {
    return { type: ERROR };
  }
  return { type: OK, token };
};

module.exports = { login };
