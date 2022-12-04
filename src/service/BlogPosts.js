const { BlogPost, Category, User } = require('../models');

const fetchAll = async () => {
  const posts = await BlogPost.findAll({
    attributes: { exclude: ['UserId'] },
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
        through: { attributes: [] },
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });
  return posts;
};

module.exports = { fetchAll };
