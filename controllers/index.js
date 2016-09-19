'use strict'

const express = require('express')
const router = express.Router()
const auth = require('../auth');

const postModel = require('../model/posts_query')
const commentsModel = require('../model/comments_query')

/* GET index page & render all posts within database  */
router.get('/', (req, res, next) => {
  postModel.getAllPostsWithCommentCount()
    .then((post) => {
      res.render('index', {posts:post.rows})
    })
    .catch((err) => {
      console.error('Error getting from database!')
      next(err)
    })
})

router.get('/v1/API', (req, res, next) => {
  postModel.getAllPostsWithCommentCount().then(count => res.json(count.rows))
})

// GET route for when you click on login - passport authenticates through google
router.get('/auth/google',
  auth.passport.authenticate('google', { scope: ['openid email profile'] }));


// If successful auth - redirects to home page, if not - redirects to /login
router.get('/auth/google/callback',
  auth.passport.authenticate('google', {
    failureRedirect: '/login'
  }),
  function(request, response) {
    // Authenticated successfully
    response.redirect('/');
  });


module.exports = router
