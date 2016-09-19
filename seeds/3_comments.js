exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('comments').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('comments').insert({
          created_at: 'September 18, 2016  │  6:30 pm',
          post_id: 1,
          commenter_id: 2,
          body: 'Werd'
        }),
        knex('comments').insert({
          created_at: 'September 18, 2016  │  6:34 pm',
          post_id: 1,
          commenter_id: 1,
          body: 'Thanks!'
        }),
        knex('comments').insert({
          created_at: 'September 18, 2016  │  6:31 pm',
          post_id: 2,
          commenter_id: 3,
          body: 'Get it, girl! 🔥'
        }),
        knex('comments').insert({
          created_at: 'September 18, 2016  │  6:36 pm',
          post_id: 2,
          commenter_id: 3,
          body: 'Hahah '
        }),
        knex('comments').insert({
          created_at: 'September 18, 2016  │  6:45 pm',
          post_id: 3,
          commenter_id: 1,
          body: 'go, minnie! 🐭'
        }),
        knex('comments').insert({
          created_at: 'September 18, 2016  │  6:56 pm',
          post_id: 3,
          commenter_id: 1,
          body: 'omg so cool'
        }),
      ]);
    });
};
