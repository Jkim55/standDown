exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({
          user_id: 1,
          title: 'My first post',
          body: 'This is a test post by Ji'
        }),

        knex('posts').insert({
          user_id: 1,
          title: 'My second post',
          body: 'This is a test post by Ji'
        }),

        knex('posts').insert({
          user_id: 2,
          title: 'Guest Post by Minnie',
          body: 'A post with words in it!'
        })
      ]);
    });
};
