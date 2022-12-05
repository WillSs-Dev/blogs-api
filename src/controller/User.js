const userService = require('../service/User');

const OK_STATUS = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const CONFLICT = 409;

const login = async ({ body }, res) => {
  const { type, token } = await userService.login(body);
  if (!type) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
  }
  res.status(OK_STATUS).json({ token });
};

const getAll = async (__req, res) => {
  const users = await userService.fetchAll();
  res.status(OK_STATUS).json(users);
};

const getById = async ({ params }, res) => {
  const { type, data } = await userService.fetchById(params.id);
  if (!type) {
    return res.status(NOT_FOUND).json({ message: 'User does not exist' });
  }
  res.status(OK_STATUS).json(data);
};

const add = async ({ body }, res) => {
  const { type, data } = await userService.insert(body);
  if (!type) {
    return res.status(CONFLICT).json({ message: 'User already registered' });
  }
  res.status(CREATED).json({ token: data });
};

module.exports = { login, getAll, getById, add };
