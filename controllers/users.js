'use strict'

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')

const passport = require('../passport');
const userModel = require('../model/users_query')


/* GET login page */
router.get('/', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('Can\'t access route when not logged in');
    res.redirect('/users/login');
  } else {
    res.redirect('/users/dashboard');
    return;
  }
});

/* GET registration page */
router.get('/register', (req, res, next) => {
  if(req.isAuthenticated()){
    console.log('Can\'t access route when logged in');
    res.redirect('/users/dashboard');
  } else {
    res.render('register');
  }
})

/* Register a new user */
router.post('/register', (req, res, next) => {
  if (!req.body.username || !req.body.password || !req.body.email) {
    res.render('error', {message:"Please fill in all fields"})
  } else {
    userModel.count(req.body.username)
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
          userModel.add(userData)
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
  router.get('/login', (req, res, next) => {
    res.render('login');
})

/* Authenticate the login of a user */

// router.post('/login', (req, res, next) => {
//   if (!req.body.username || !req.body.password) {
//     res.render('error', {message: "Please fill in all fields"})
//   } else {
//     userModel.count(req.body.username)
//     .then((num) => {
//       if (parseInt(num[0].count) === 0){
//         res.render('error', {message: 'User is not registered.'})
//       } else {
//         passport.authenticate('local', {
//           successRedirect: '/users/dashboard',
//           failureRedirect: '/users/login'
//         })
//       }
//     })
//   }
// });


/* Authenticate the user from /users/login */
router.post('/login', passport.authenticate('local', {
  successRedirect: '/users/dashboard',
  failureRedirect: '/users/login'
}));

router.get('/dashboard', (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.redirect('/users/login');
    return;
  }
  res.render('dashboard', {userData: req.user})
});

/* Clear the session and unauthenticate the user */
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
