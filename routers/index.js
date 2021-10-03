const express = require('express');
const router = express.Router();

const login = require("./login");
const signup = require("./signup");
const dashboard = require("./dashboard");

router.use('/login', login);
router.use('/signup', signup);
router.use('/', dashboard);

module.exports = router;
