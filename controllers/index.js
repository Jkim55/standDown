'use strict'

const express = require('express');
const router = express.Router();
const pg = require('../model/knex_config.js')

const postModel = require('../model/posts_query.js')


/* GET home page. */
router.get('/', function(req, res, next) {
  let allPosts = postModel.allPosts()
    .then((rows)=>{
      res.render('index', {posts:rows})
    })
    .catch((err)=>{
      console.error('Error getting from database!');
      next(err)
    })})

router.put('/', function(req, res, next) {
// some code to that calls on model
})

router.post('/', function(req, res, next) {
  // some code to that calls on model
})
router.delete('/', function(req, res, next) {
  // some code to that calls on model
})

module.exports = router;
