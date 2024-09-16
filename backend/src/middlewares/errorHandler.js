const errorHandler = (err, req, res, next) => {
  if(process.env.NODE_ENV === 'development') console.error(err.stack);

  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    errors: err.errors || []
  });
}

export default errorHandler;