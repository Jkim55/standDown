exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({
          post_id: 1,
          commenter_id: 2,
          body: 'test comment by Minnie'
        }),
        knex('comments').insert({
          post_id: 2,
          commenter_id: 3,
          body: 'another test comment by Nick'
        }),
        knex('comments').insert({
          post_id: 3,
          commenter_id: 1,
          body: 'this comment was made by Ji'
        }),
      ]);
    });
};
