const express = require('express');
const router = express.Router();

const authMiddleware = require("../service/auth");
const Roles = require("../models/Roles");
const userService = require("../service/user.service");

router.get('/', authMiddleware.authorize(Roles.Admin), async (req, res, next) => {
  // if user is not in request
  // that mean the token is invalid leads  to jwt decode failure
  // We treat that user is not logged in and require him to re-login
  if(!req?.user) {
    try {
      res.render('homepage', {
        message: "Welcome to Evotek CRUD Manager, Guest!",
      });
    } catch (err) {
      next(err);
    } finally {
      return;
    };
  }
  const currentUser = req.user;
  const sub = String(currentUser.sub);
  const role = String(currentUser.role);

  if(role === Roles.Admin) {
    const users = await userService.getAll();
    res.render('homepage', {
      message: "Welcome to Evotek CRUD Manager, Administrator User!",
      users: users,
    });
  } else {
    const user = await userService.getById(sub);
    res.render('homepage', {
      message: "Welcome to Evotek CRUD Manager, User!",
      userProfile: user
    });
  };
});

module.exports = router;