const express = require('express');
const { validateLoginRequest } = require('./middlewares/reqValidation');
const userController = require('./controller/User');
// ...

const app = express();

app.use(express.json());

// ...

app.post('/login', validateLoginRequest, userController.login);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
