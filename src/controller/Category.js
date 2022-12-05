const categoryService = require('../service/Category');

const OK_STATUS = 200;
const CREATED_STATUS = 201;

const getAll = async (__req, res) => {
  const categories = await categoryService.fetchAll();
  res.status(OK_STATUS).json(categories);
};

const add = async ({ body }, res) => {
  const { type, data } = await categoryService.insert(body);
  if (type) {
    res.status(CREATED_STATUS).json(data);
  }
};

module.exports = { getAll, add };
