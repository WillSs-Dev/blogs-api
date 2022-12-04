const blogPostService = require('../service/BlogPosts');

const OK_STATUS = 200;

const getAll = async (__req, res) => {
  const posts = await blogPostService.fetchAll();
  res.status(OK_STATUS).json(posts);
};

module.exports = { getAll };
