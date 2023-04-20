"use strict";

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'mysecretkey'
};
//# sourceMappingURL=config.dev.js.map
