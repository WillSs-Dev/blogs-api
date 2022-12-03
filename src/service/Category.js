const { Category } = require('../models');

const fetchAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = { fetchAll };
