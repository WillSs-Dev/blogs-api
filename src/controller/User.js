const userService = require('../service/User');

const OK_STATUS = 200;
const BAD_REQUEST = 400;

const login = async ({ body }, res) => {
  const { type, token } = await userService.login(body);
  if (!type) {
    return res.status(BAD_REQUEST).json({ message: 'Invalid fields' });
  }
  res.status(OK_STATUS).json({ token });
};

const getAll = async (__req, res) => {
  const data = await userService.fetchAll();
  res.status(OK_STATUS).json(data);
};

const getById = async (req, res) => {

};

module.exports = { login, getAll, getById };
