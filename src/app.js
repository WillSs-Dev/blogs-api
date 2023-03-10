const express = require('express');
const { validateLoginRequest,
  validateCategoryRequest,
  validateUserRequest,
  validatePostRequest } = require('./middlewares/reqValidation');
const userController = require('./controller/User');
const categoryController = require('./controller/Category');
const blogPostController = require('./controller/BlogPost.js');
const { validateToken } = require('./middlewares/authentification');
// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', validateLoginRequest, userController.login);

app.get('/user', validateToken, userController.getAll);

app.get('/user/:id', validateToken, userController.getById);

app.get('/categories', validateToken, categoryController.getAll);

app.get('/post', validateToken, blogPostController.getAll);

app.get('/post/:id', validateToken, blogPostController.getById);

app.post('/post', validateToken, validatePostRequest, blogPostController.add);

app.post('/categories', validateToken, validateCategoryRequest, categoryController.add);

app.post('/user', validateUserRequest, userController.add);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
