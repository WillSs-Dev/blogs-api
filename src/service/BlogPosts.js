const { BlogPost, Category, User } = require('../models');

const OK = 1;
const ERROR = 0;

const fetchAll = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
        // through: { attributes: [] },
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

const fetchById = async (id) => {
  try {
    const { dataValues: post } = await BlogPost.findByPk(id, {
      include: [
        {
          model: User, as: 'user', attributes: { exclude: ['password'] },
        },
        {
          model: Category, as: 'categories', through: { attributes: [] },
        },
      ],
    });
    return { type: OK, data: post };
  } catch (__e) {
    return { type: ERROR };
  }
};

module.exports = { fetchAll, fetchById };
