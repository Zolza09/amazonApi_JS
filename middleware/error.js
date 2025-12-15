const errorHandler = (err, req, res, next) => {
  console.log(err.stack.red);

  const error = { ...err };

  error.message = err.message;
  console.log(err);

  if (error.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error.message = `${field} талбар давхардсан байна`;
    error.statusCode = 400;
  }

  if (error.name === "CastError") {
    error.message = "Энэ ID буруу бүтэцтэй ID байна!";
    error.statusCode = 400;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error,
  });
};

module.exports = errorHandler;
