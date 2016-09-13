exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({
          user_id: 1,
          wins: 'Figured out MVC',
          losses: 'Didn\'t get as much work done as projected',
          learned: 'Don\'t let your reptilian brain rule'
        }),

        knex('posts').insert({
          user_id: 1,
          wins: 'Figured out routes',
          losses: 'Being tired from sleep deprivation is undercutting my performance',
          learned: 'Get more sleep!'
        }),

        knex('posts').insert({
          user_id: 2,
          wins: 'Read encouraging articles',
          losses: 'Woke up late',
          learned: 'Don\'t stay up so late watching trash tv'
        })
      ]);
    });
};
