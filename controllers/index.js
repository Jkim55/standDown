'use strict'

const express = require('express');
const router = express.Router();
// const pg = require('../model/knex_config.js')
const postQuery = require('../model/posts_query.js')


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
