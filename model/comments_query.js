'use strict'

const knex = require('./knex_config')

function getAllComments(userID) {
  return knex('comments')
    .leftJoin('users', 'users.id', 'comments.commenter_id')
    .select(
      'users.user_name as userName',
      'comments.id',
      'comments.created_at',
      'comments.post_id as postID',
      'comments.body'
    )
    .where('comments.post_id', userID)
}

function addComment(postID, userID, comment) {
  return knex('comments')
    .insert({
      post_id: postID,
      commenter_id: userID,
      body: comment.body,
    })
}

function deleteComment(commentID){
  return knex('comments')
    .where('id', commentID)
    .del()
}
module.exports = {
  getAllComments: getAllComments,
  addComment: addComment,
  deleteComment: deleteComment
}
