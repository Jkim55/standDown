'use strict'

const express = require('express')
const router = express.Router()

const postModel = require('../model/posts_query')
const commentsModel = require('../model/comments_query')

/* GET index page & render all posts within database  */
router.get('/', (req, res, next) => {
  postModel.getAllPostsWithCommentCount()
    .then((post) => {
      let userLoggedIn = false
      if(req.isAuthenticated()){
        userLoggedIn = req.user.user_name
      }
      res.render('index', {
        userLoggedIn: userLoggedIn,
        posts:post.rows
      })
    })
    .catch((err) => {
      console.error('Error getting from database!')
      next(err)
    })
})

router.get('/v1/API', (req, res, next) => {
  postModel.getAllPostsWithCommentCount().then(count => res.json(count.rows))
})


module.exports = router
