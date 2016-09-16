'use strict'

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const passport = require('../passport');
const users = require('../authUsers')
const usersModel = require('../model/users_query')


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
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.render('error', {message:"Please fill in all fields"})
  } else {
    usersModel.count(req.body.username)
      .then((num) => {
        console.log('num is: ', num, 'num.count is: ', num[0].count);
        if (parseInt(num[0].count) > 0){
          res.render('error', {message: 'Username is taken.'})
        } else {
          let userData = {
            user_name: req.body.username,
            password: bcrypt.hashSync(req.body.password, 8),      // passwords are never stored in plain text
            email: req.body.email
          }
          usersModel.add(userData)
            .then(() =>{
              res.redirect('/users/login')
            })
            .catch((err) => {
              console.log(err);
              res.render('error', {message: 'error in inserting user data into database'})
            })
        }

      })
  }
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
