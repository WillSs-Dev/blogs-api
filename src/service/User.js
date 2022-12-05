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
  if (!user.length) {
    return { type: ERROR };
  }
  const token = jwt.sign(
    {
      data: { user: { name: user[0].dataValues.displayName, email } },
    },
    secret,
    jwtConfig,
  );
  return { type: OK, token };
};

const fetchAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });
  return users;
};

const fetchById = async (id) => {
  try {
    const { dataValues: user } = await User.findByPk(id);
    delete user.password;
    return { type: OK, data: user };
  } catch (__e) {
    return { type: ERROR };
  }
};

const insert = async (user) => {
  const [search] = await User.findAll({ where: { email: user.email } });
  if (search) {
    return { type: ERROR };
  }
  const { displayName, email, image = '' } = user;
  await User.create(user);
  const token = jwt.sign({
    data: {
      user: { displayName, email, image },
    },
  },
  secret,
  jwtConfig);
  return { type: OK, data: token };
};

module.exports = { login, fetchAll, fetchById, insert };
