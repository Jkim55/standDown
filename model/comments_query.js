const knex = require('./knex_config')

function getAllComments(userID) {
  return knex('comments')
    .join('users', 'users.id', 'comments.commenter_id')
    .select(
      'users.user_name as userName',
      'comments.body',
      'comments.created_at'
    )
    .where('comments.post_id', userID)
}

module.exports = {
  getAllComments: getAllComments,
}
