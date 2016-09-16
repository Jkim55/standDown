'use strict'

const express = require('express');
const router = express.Router();

const passport = require('../passport');
const users = require('../authUsers')

/* GET users login */
router.get('/', (req, res, next) => {
  // Don't show login and register to logged in users
  if (req.isAuthenticated()){
    res.redirect('/users/dashboard');
    return;
  }
  res.redirect('/users/login')
});

router.get('/login', (req, res, next) => {
  res.render('login');
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login'
  })
);


router.get('/register', (req, res, next) => {
  res.render('register');
})

// added from passport example
router.post('/register', (req, res, next) => {
  users.add(req.body.username, req.body.password)   // Add user to data store
    .then (()=>{
      res.redirect('/users/login');
    })
    .catch (() => {
      new Error('User could not be created.')
    });
})

router.get('/dashboard', (req, res, next) => {
  // Determine if the user is authorized to view the page
  if (!req.isAuthenticated()) {
    res.redirect('/users/login');
    return;
  }
  // req.user will be the value from deserializeUser
  res.render('dashboard', { user: req.user })
});

router.get('/logout', (req, res, next) => {
  // Clear the session and unauthenticate the user
  req.logout();
  res.redirect('/');
});

module.exports = router;
