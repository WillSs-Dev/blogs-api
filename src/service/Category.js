const { OK } = require('mysql2/lib/packets');
const { Category } = require('../models');

const fetchAll = async () => {
  const categories = await Category.findAll();
  return categories;
};

const insert = async ({ name }) => {
  const newCategory = await Category.create({ name });
  return { type: OK, data: newCategory };
};

module.exports = { fetchAll, insert };
