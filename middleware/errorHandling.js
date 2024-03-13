const errorResponder = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: err,
  });
};

const invalidPathHandler = (req, res, next) => {
  res.status(404).send("Page not found");
  next();
};

export { errorResponder, invalidPathHandler };
