const jwt = require('jsonwebtoken');
const { BlogPost, Category, User, PostCategory } = require('../models');

const secret = process.env.JWT_SECRET || '$uper$ecretk£y';
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

const getEmailFromToken = (token) => {
  const { data } = jwt.verify(token, secret);
  return data.user.email;
};

const insert = async (body, { authorization }) => {
  const email = getEmailFromToken(authorization);
  const [user] = await User.findAll({
    attributes: ['id'],
    where: {
      email,
    },
  });
  const newPost = await BlogPost.create(
    { ...body, userId: user.dataValues.id, updated: new Date(), published: new Date() },
    );
  const { categoryIds } = body;
  const { id } = newPost;
  const promisses = categoryIds.map((categoryId) => PostCategory.create(
    { postId: id, categoryId },
  ));
  await Promise.all(promisses);
  return { data: newPost };
};

module.exports = { fetchAll, fetchById, insert };
