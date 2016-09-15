exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({
          post_id: 1,
          commenter_id: 2,
          body: 'Werd'
        }),
        knex('comments').insert({
          post_id: 1,
          commenter_id: 1,
          body: 'Thanks!'
        }),
        knex('comments').insert({
          post_id: 2,
          commenter_id: 3,
          body: 'Get it, girl! 🔥'
        }),
        knex('comments').insert({
          post_id: 2,
          commenter_id: 3,
          body: 'Hahah '
        }),
        knex('comments').insert({
          post_id: 3,
          commenter_id: 1,
          body: 'go, minnie! 🐭'
        }),
        knex('comments').insert({
          post_id: 3,
          commenter_id: 1,
          body: 'omg so cool'
        }),
      ]);
    });
};
