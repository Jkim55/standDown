'use strict'

const express = require('express');
const router = express.Router();
const postQuery = require('../model/posts_query.js')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.redirect('/');
})

router.get('/new',  (req, res, next) => {
  res.render('posts')
})

router.post('/new', (req, res, next) => {  // create a new post
  postQuery.insertNewPost(req.body)
  .then(() => {
    res.redirect('/')
  })
  .catch((err) => {
    console.error('Error caught in inserting into DB');
    next(err)
  })
})

router.get('/:id', (req, res, next) => {
  postQuery.getPostsByID(req.params.id)
    .then((data) => {
      res.render('singlePost', {data:data[0]})
    })
    .catch((err) => {
      console.error('Error caught in retrieving post from DB');
      next(err)
    })
})

router.get('/:id/update', (req, res, next) => {   // update a post
  postQuery.updatePost(req.params.id)
  .then(() => {
    res.redirect('/')
  })
  .catch((err) => {
    console.error('Error caught in deleting post from DB');
    next(err)
  })
})

router.get('/:id/delete', (req, res, next) => {  // delete a post
  postQuery.deletePost(req.params.id)
  .then(() => {
    res.redirect('/')
  })
  .catch((err) => {
    console.error('Error caught in deleting post from DB');
    next(err)
  })
})

module.exports = router;
