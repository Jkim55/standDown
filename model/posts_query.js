'use strict'

const knex = require('./knex_config')

function getAllPosts() {
  return knex('posts')
    .leftJoin('users', 'users.id', 'posts.user_id') //ljoin to view wo login
    .select(
      'users.id as userId',
      'users.user_name',
      'posts.id as postID',
      'posts.created_at',
      'posts.wins',
      'posts.losses',
      'posts.learned'
    )
}

function getPostByID (id) {
  return knex('posts')
    .leftJoin('users', 'users.id', 'posts.user_id') //ljoin to view wo login
    .select(
      'users.id as userId',
      'users.user_name',
      'posts.id as postID',
      'posts.created_at',
      'posts.wins',
      'posts.losses',
      'posts.learned'
    )
    .where('posts.id', id).first()
}

function insertNewPost(postContent, user_id) {
  return knex('posts')
    .insert({
      user_id: user_id,
      wins: postContent.wins,
      losses: postContent.losses,
      learned: postContent.learned
    })
}

function retrievePost(postID){
  return knex('posts')
    .where('id', postID)
}

function updatePost(postID, postContent){
  return knex('posts')
    .where('id', postID)
    .update({
      wins: postContent.wins,
      losses: postContent.losses,
      learned: postContent.learned
    })
}

function deletePost(postID){
  return knex('posts')
    .where('id', postID)
    .del()
}

module.exports = {
  getAllPosts: getAllPosts,
  getPostByID: getPostByID,
  insertNewPost: insertNewPost,
  retrievePost: retrievePost,
  updatePost: updatePost,
  deletePost: deletePost,
}
