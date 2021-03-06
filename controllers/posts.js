'use strict'

const express = require('express')
const router = express.Router()
const moment = require('moment')
const postModel = require('../model/posts_query')
const userModel = require('../model/users_query')
const commentsModel = require('../model/comments_query')
const bcrypt = require('bcrypt')


/* REDIRECTS '/posts' to '/'. */
router.get('/', (req, res, next) => {
  res.redirect('/')
})


router.get('/new',  (req, res, next) => {
  let userLoggedIn = false
  if(!req.isAuthenticated()){
    console.log('Can\'t access route when not logged in')
    res.redirect('/users/login')
    return
  }
  res.render('createPost', {
    userLoggedIn: req.user.user_name
  })
})

router.post('/new', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('Can\'t add a post if not logged in')
    res.redirect('/users/login')
    return
  }
  userModel.findUserbyName(req.user.user_name)
    .then((data) => {
      let userID = data.id
      let time = moment().format('MMMM DD, YYYY  │  h:mma')
      postModel.insertNewPost(req.body, userID, time)
        .then(() => {
          console.log('new time: ', time)
          res.redirect('/')
        })
    })
    .catch((err) => {
      console.error('Error caught in inserting into DB')
      next(err)
    })
})

router.get('/:id', (req, res, next) => {
  let post = postModel.getPostByID(req.params.id)
  let comments = commentsModel.getAllComments(req.params.id)
  Promise.all([post,comments])
    .then((data) => {
      let post = data[0]
      let postEditAuthorized
      if (req.isAuthenticated() && post.user_name === req.user.user_name){
        postEditAuthorized = true
      }
      let userLoggedIn = false
      if (req.isAuthenticated()){
        userLoggedIn = req.user.user_name
      }
      let comments = data[1]
      if (req.isAuthenticated()){
        for(let i=0; i<comments.length; i++) {
          if (comments[i].userName === req.user.user_name){
            comments[i].commentOwner = true
          } else {
            comments[i].commentOwner = false
          }
        }
      }
      res.render('singlePost', {
        post: post,
        postEditAuthorized: postEditAuthorized,
        comments: comments,
        userLoggedIn: userLoggedIn
      })
    })
    .catch((err) => {
      console.error('Error caught in retrieving post from DB')
      next(err)
    })
})

router.get('/:id/update', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('Can\'t access route when not logged in')
    res.redirect('/users/login')
    return
  }
  postModel.retrievePost(req.params.id)
  .then((data) => {
    console.log('editing the post')
    res.render('editPost', {data:data[0]})
  })
  .catch((err) => {

    console.error('Error caught in updating post from DB')
    next(err)
  })
})

router.post('/:id/update', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('Cannot update post when not logged in!')
    res.redirect('/users/login')
    return
  }
  postModel.updatePost(req.params.id, req.body)
  .then(() => {
    res.redirect('/posts/' + req.params.id)
  })
  .catch((err) => {
    console.error('Error caught in updating post from DB')
    next(err)
  })
})

router.get('/:id/delete', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('Cannot delete a post when not logged in!')
    res.redirect('/users/login')
    return
  }
  postModel.deletePost(req.params.id)
  .then(() => {
    res.redirect('/')
  })
  .catch((err) => {
    console.error('Error caught in deleting post from DB')
    next(err)
  })
})

router.post('/:id/comment', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('Cannot post comments when not logged in!')
    res.redirect('/users/login')
    return
  }
  userModel.findUserbyName(req.user.user_name)
    .then((userData) => {
      let time = moment().format('MMMM DD, YYYY  ・  h:mma')
      commentsModel.addComment(req.params.id, userData.id, req.body, time)
        .then (() => {
          res.redirect('/posts/' + req.params.id)
        })
    })
    .catch((err) => {
      console.error('Error caught in updating post from DB')
      next(err)
    })
})

router.get('/:id/comment/:cID/delete', (req, res, next) => {
  if(!req.isAuthenticated()){
    console.log('Cannot delete posts when not logged in!')
    res.redirect('/users/login')
    return
  }
  commentsModel.deleteComment(req.params.cID)
    .then(() => {
      res.redirect('/posts/' + req.params.id)
    })
    .catch((err) => {
      console.error('Error caught in updating post from DB')
      next(err)
    })
})

module.exports = router
