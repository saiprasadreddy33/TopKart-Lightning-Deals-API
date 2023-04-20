"use strict";

var jwt = require('jsonwebtoken');

var dotenv = require('dotenv');

dotenv.config();
var JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h'
  });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyToken
};
//# sourceMappingURL=tokenUtils.dev.js.map
