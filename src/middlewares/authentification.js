const jwt = require('jsonwebtoken');

const UNAUTHORIZED = 401;
const secret = process.env.JWT_SECRET || '$uper$ecretk£y';

const validateToken = ({ headers }, res, next) => {
  if (!headers.authorization) {
    return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
  }
  try {
    jwt.verify(headers.authorization, secret);
    next();
  } catch (__e) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};

module.exports = { validateToken };
