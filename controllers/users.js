'use strict'

const express = require('express');
const router = express.Router();

const passport = require('../passport');
const users = require('../authUsers')

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

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login'
  })
);


router.get('/register', function(req, res, next) {
  res.render('register');
})

// added from passport example
router.post('/register', function (req, res, next) {
  var success = users.add(req.body.username, req.body.password)   // Add user to data store
  if (!success) {
    next(new Error('User could not be created.'));
    return;
  }
  res.redirect('/users/register');  // Send to login page

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
