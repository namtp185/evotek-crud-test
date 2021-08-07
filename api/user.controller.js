const express = require("express");
const router = express.Router();

const Roles = require("../models/Roles");
const authMiddleware = require("./auth");
const { getAll, getByUsername } = require("./user.service");

router.post('/authenticate', async (req, res, next) => {
  authMiddleware.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
});

router.get('/thirdparty/:id', authMiddleware.authorize(), (req, res, next) => {
  // get currentUser decoded from token by the middleware and compare with id is being viewed
  const currentUser = req.user;
  const username = String(currentUser.username);
  const role = String(currentUser.role);

  const id = String(req.params.id);

  // normal user can't see other profile id
  // Only thirdparty user allowed to access
  if(username !== id || role !== Roles.ThirdParty) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // getUserById
  getById(id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));

});


router.get('/', authMiddleware.authorize(Roles.Admin), (req, res, next) => {
  getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
});

router.get('/:username', authMiddleware.authorize(), (req, res, next) => {
  // get currentUser decoded from token by the middleware and compare with id is being viewed
  const currentUser = req.user;
  const username = String(currentUser.username);
  const role = String(currentUser.role);

  const usernameToFetch = String(req.params.username);

  console.log(username);
  console.log(usernameToFetch);

  // normal user can't see other profile with different username
  // controller will decide which roles will have the access to the resource correspond with this endpoint
  if(username !== usernameToFetch && role !== Roles.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // getUserByUsername
  getByUsername(usernameToFetch)
    .then(user => {
      console.log(user)
      user 
        ? res.render('homepage', {
          message: "",
          userProfile: user
        })
        : res.sendStatus(404)
    })
    .catch(err => next(err));

});

module.exports = router;