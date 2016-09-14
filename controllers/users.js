// users page will allow:
// login
// create new user
// edit user information

'use strict'

const express = require('express');
const router = express.Router();

/* GET users login */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'My Stand Down App' });
})

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'My Stand Down App' });
})

module.exports = router;
