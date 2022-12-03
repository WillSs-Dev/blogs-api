const categoryService = require('../service/Category');

const OK_STATUS = 200;

const getAll = async (__req, res) => {
  const categories = await categoryService.fetchAll();
  res.status(OK_STATUS).json(categories);
};

module.exports = { getAll };
