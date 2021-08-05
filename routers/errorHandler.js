const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (typeof (err) === 'string') {
      // custom application error
      return res.status(400).json({ message: err });
  }

  if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      res.render('homepage', {
        message: "Welcome to Evotek CRUD Manager, Guest!",
      });
      return;
  }

  // default to 500 server error
  return res.status(500).json({ message: err.message });
}

module.exports = errorHandler;