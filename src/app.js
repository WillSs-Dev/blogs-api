const express = require('express');
const { validateLoginRequest } = require('./middlewares/reqValidation');
const userController = require('./controller/User');
const { validateToken } = require('./middlewares/authentification');
// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', validateLoginRequest, userController.login);

app.get('/user', validateToken, (userController.getAll));

app.get('/user/:id', validateToken, (userController.getById));

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
