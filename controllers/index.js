'use strict'

const express = require('express')
const router = express.Router()

const postModel = require('../model/posts_query')


/* GET index page & render all posts within database  */
router.get('/', (req, res, next) => {
  postModel.getAllPosts()
    .then((posts) => {
      res.render('index', {posts:posts})
    })
    .catch((err) => {
      console.error('Error getting from database!')
      next(err)
    })
})


module.exports = router
