var knex = require('./knex_config')

function Posts(){            // this retrieves all posts
  return knex('posts')
}

function getPostsByID (id) {
  return knex('posts')
    .where('id', id)
}

function insertNewPost(postContent) {
  return knex('posts')
    .insert(postContent)
}

function updatePost(id){
  return knex('posts')
    .where('id', id)
    .update({
      wins: wins,
      losses: losses,
      learned: learned
    })
}

function deletePost(id){
  return knex('posts')
    .where('id', id)
    .del()
}

module.exports = {
  allPosts: Posts,
  getPostsByID: getPostsByID,
  insertNewPost: insertNewPost,
  updatePost: updatePost,
  deletePost: deletePost
}
