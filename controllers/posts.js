'use strict'

const express = require('express');
const router = express.Router();
const postModel = require('../model/posts_query')
const userModel = require('../model/users_query')
const commentsModel = require('../model/comments_query')

/* REDIRECTS '/posts' to '/'. */
router.get('/', (req, res, next) => {
  res.redirect('/')
})

router.get('/new',  (req, res, next) => {
  res.render('createPost')
})

router.post('/new', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('error!');
    res.redirect('/users/login');
  } else {
    userModel.findUserByID(req.user)
      .then((data) =>{
        console.log('data:', data);
        console.log('data.user_id:', data.user_id);
        console.log('req.body:', req.body);
        let userID = data.user_id
        // postModel.insertNewPost(req.body, userID)
        //   .then(() => {
        //     res.redirect('/')
        //   })
      })
      .catch((err) => {
        console.error('Error caught in inserting into DB');
        next(err)
      })
  }
})

router.get('/:id', (req, res, next) => {
  let post = postModel.getPostByID(req.params.id)
  let comments = commentsModel.getAllComments(req.params.id)
  Promise.all([post,comments])
    .then((data) => {
      let post = data[0]
      let comments = data[1]
      res.render('singlePost', {
        post: post,
        comments: comments
      })
    })
    .catch((err) => {
      console.error('Error caught in retrieving post from DB');
      next(err)
    })
})

router.get('/:id/update', (req, res, next) => {   // update a post
  if(!req.isAuthenticated()){
    console.log('error!');
    res.redirect('/users/login');
  } else {
    postModel.retrievePost(req.params.id)
    .then((data) => {
      console.log('editing the post');
      res.render('editPost', {data:data[0]})
    })
    .catch((err) => {
      console.error('Error caught in updating post from DB');
      next(err)
    })
  }
})

router.post('/:id/update', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('Cannot update post when not logged in!');
    res.redirect('/users/login');
  } else {
    postModel.updatePost(req.params.id, req.body)
    .then(() => {
      res.redirect('/posts/' + req.params.id)
    })
    .catch((err) => {
      console.error('Error caught in updating post from DB');
      next(err)
    })
  }
})

router.get('/:id/delete', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('Cannot delete a post when not logged in!');
    res.redirect('/users/login');
  } else {
    postModel.deletePost(req.params.id)
    .then(() => {
      res.redirect('/')
    })
    .catch((err) => {
      console.error('Error caught in deleting post from DB');
      next(err)
    })
  }
})

router.post('/:id/comment', (req, res, next) => {
  commentsModel.addComment(req.params.id, req.body)
  .then(() => {
    res.redirect('/posts/' + req.params.id)
  })
  .catch((err) => {
    console.error('Error caught in updating post from DB');
    next(err)
  })
})

router.get('/:id/comment/:cID/delete', (req, res, next) => {
  commentsModel.deleteComment(req.params.cID)
  .then(() => {
    res.redirect('/posts/' + req.params.id)
  })
  .catch((err) => {
    console.error('Error caught in updating post from DB');
    next(err)
  })
})

module.exports = router;
