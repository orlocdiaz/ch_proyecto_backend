function errorHandler(error, req, res, next) {
  res.status(error.code || 500).json({
    status: error.status || 'Error!',
    message: error.message,
  });
}

module.exports = errorHandler;
