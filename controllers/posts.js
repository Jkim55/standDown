'use strict'

const express = require('express');
const router = express.Router();
const postQuery = require('../model/posts_query.js')

/* REDIRECTS '/posts' to '/'. */
router.get('/', (req, res, next) => {
  res.redirect('/')
})

router.get('/new',  (req, res, next) => {
  res.render('createPost')
})

router.post('/new', (req, res, next) => {
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
  postQuery.retrievePost(req.params.id)
  .then((data) => {
    res.render('editPost', {data:data[0]})
  })
  .catch((err) => {
    console.error('Error caught in updating post from DB');
    next(err)
  })
})

router.post('/:id/update', (req, res, next) => {
  postQuery.updatePost(req.params.id, req.body)
  .then(() => {
    res.redirect('/posts/' + req.params.id)
  })
  .catch((err) => {
    console.error('Error caught in updating post from DB');
    next(err)
  })
})

router.get('/:id/delete', (req, res, next) => {
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
