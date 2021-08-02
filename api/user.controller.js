const express = require("express");
const router = express.Router();

const Roles = require("../models/Roles");
const authMiddleware = require("./auth");
const { getAll, getById } = require("./user.service");

router.post('/authenticate', async (req, res, next) => {
  authMiddleware.authenticate(req.body)
    .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
});

router.get('/', authMiddleware.authorize(Roles.Admin), (req, res, next) => {
  getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
});

router.get('/:id', authMiddleware.authorize(), (req, res, next) => {
  // get currentUser decoded from token by the middleware and compare with id is being viewed
  const currentUser = req.user;
  const sub = String(currentUser.sub);
  const role = String(currentUser.role);


  const id = String(req.params.id);

  // normal user can't see other profile id
  if(sub !== id && role !== Roles.Admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  // getUserById
  getById(id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));

});

module.exports = router;