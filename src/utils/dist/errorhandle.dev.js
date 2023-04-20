"use strict";

/**
 * Error handler middleware function.
 * @param {Error} error - The error object.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
function errorHandler(error, req, res, next) {
  var status = error.status || 500;
  var message = error.message || 'Something went wrong';
  res.status(status).json({
    error: message
  });
}

module.exports = errorHandler;
//# sourceMappingURL=errorhandle.dev.js.map
