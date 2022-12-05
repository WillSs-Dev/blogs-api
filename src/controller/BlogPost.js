const blogPostService = require('../service/BlogPosts');

const OK_STATUS = 200;
const CREATED = 201;
const NOT_FOUND = 404;

const getAll = async (__req, res) => {
  const posts = await blogPostService.fetchAll();
  res.status(OK_STATUS).json(posts);
};

const getById = async ({ params }, res) => {
  const { type, data } = await blogPostService.fetchById(params.id);
  if (!type) {
    return res.status(NOT_FOUND).json({ message: 'Post does not exist' });
  }
  res.status(OK_STATUS).json(data);
};

const add = async ({ body, headers }, res) => {
  const { data } = await blogPostService.insert(body, headers);
  res.status(CREATED).json(data);
};

module.exports = { getAll, getById, add };
