const express = require('express');
const router = express.Router();

const authMiddleware = require("../api/auth");
const Roles = require("../models/Roles");

router.get('/login/', (req, res) => {
  console.log("login route called");
  res.render('login', {
  })
});

router.get('/', authMiddleware.authorize(Roles.Admin), (err, req, res, next) => {
  console.log("index route called");
  if(err) {
    console.log(err);
    try {
      res.render('homepage', {
        message: "Welcome to Evotek CRUD Manager, Guest!",
      });
    } catch (err) {
      // next(err);
    } finally {
      return;
    };
  }
  const currentUser = req.user;
  const sub = String(currentUser.sub);
  const role = String(currentUser.role);

  if(role === Roles.Admin) {
    res.render('homepage', {
      message: "Welcome to Evotek CRUD Manager, Administrator User!",
    });
  } else {
    res.render('homepage', {
      message: "Welcome to Evotek CRUD Manager, User!",
    });
  };
});

module.exports = router;
