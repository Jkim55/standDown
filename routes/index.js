var express = require('express');
var router = express.Router();
const pg = require('../model/knex_config.js')

// var postModel = require('../model/posts')


/* GET home page. */
router.get('/', function(req, res, next) {
  pg.select().table('posts')
    .then((rows)=>{
      res.render('index', {items:rows})
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
