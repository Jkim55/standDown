var knex = require('./knex_config')

function Posts(){            // this retrieves all posts
  return knex('posts')
}

function getPostsByID (id) {
  return Posts().where('id',id)
}

function insertNewPost(author_id, title, body) {
  return Posts().insert({
    author_id: author_id,
    title: title,
    body: body,
  })
}

function updatePost(id, title, body){
  return Posts(id)
    .where('id', id)
    .update({
      title: title,
      body: body
    })
}

function deletePost(name){
  return Posts()
    .where('name', name)
    .del()
}

module.exports = {
  allPosts: Posts,
  getStudentByName: function (name) {
    return Posts().where('name',name)
  },  // can write it in here or outside as above. ie this could be getStudentByName: getStudentByName
  insertNewPost: insertNewPost,
  updatePost: updatePost,
  deletePost: deletePost
}
