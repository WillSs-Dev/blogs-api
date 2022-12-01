const { User } = require('../models');

const OK = 1;
const ERROR = 0;

const login = async ({ email, password }) => {
  const user = await User.findAll({
    where: {
      email,
      password,
    },
  });
  console.log(user);
  if (!user.length) {
    return { type: ERROR };
  }
  return { type: OK, token: 'Logado com sucesso' };
};

module.exports = { login };
