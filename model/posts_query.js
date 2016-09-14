var knex = require('./knex_config')

// function allPosts() {
//   return knex('posts')
// }

// Use this for allPosts() after user authentication is complete
function allPosts() {
  return knex('posts')
    .join('users', 'users.id', 'posts.user_id')
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

function getPostsByID (id) {
  return knex('posts')
    .where('id', id)
}

function insertNewPost(postContent) {
  return knex('posts')
    .insert(postContent)
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

function deletePost(id){
  return knex('posts')
    .where('id', id)
    .del()
}

module.exports = {
  allPosts: allPosts,
  getPostsByID: getPostsByID,
  insertNewPost: insertNewPost,
  retrievePost: retrievePost,
  updatePost: updatePost,
  deletePost: deletePost
}
