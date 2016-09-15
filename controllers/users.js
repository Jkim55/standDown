var passport = require('../passport');
var users = require('../authUsers')
// users page will allow:
// login
// create new user
// edit user information

'use strict'

const express = require('express');
const router = express.Router();

/* GET users login */
router.get('/', function(req, res, next) {
  // Don't show login and register to logged in users
  if (req.isAuthenticated()){
    res.redirect('/users/dashboard');
    return;
  }
  res.redirect('/users/login')
});

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.get('/register', function(req, res, next) {
  res.render('register');
})

router.get('/dashboard', function (req, res, next) {
  // Determine if the user is authorized to view the page
  if (!req.isAuthenticated()) {
    res.redirect('/users/login');
    return;
  }
  // req.user will be the value from deserializeUser
  res.render('dashboard', { user: req.user })
});

router.get('/logout', function (req, res) {
  // Clear the session and unauthenticate the user
  req.logout();
  res.redirect('/');
});

module.exports = router;
