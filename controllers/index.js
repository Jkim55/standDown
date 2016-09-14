'use strict'

const express = require('express');
const router = express.Router();
// const pg = require('../model/knex_config.js')
const postQuery = require('../model/posts_query.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  postQuery.allPosts()
    .then((rows)=>{
      res.render('index', {posts:rows})
    })
    .catch((err)=>{
      console.error('Error getting from database!');
      next(err)
    })
})


module.exports = router;
