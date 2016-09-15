'use strict'

const express = require('express');
const router = express.Router();
const postQuery = require('../model/posts_query')


/* GET home page. */
router.get('/', function(req, res, next) {
  postQuery.getAllPosts()
    .then((posts)=>{
      res.render('index', {posts:posts})
    })
    .catch((err)=>{
      console.error('Error getting from database!');
      next(err)
    })
})


module.exports = router;
