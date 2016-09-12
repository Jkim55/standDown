exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          user_name: 'Jiggabot',
          first_name: 'Ji',
          last_name: 'Kim',
          email: 'ji@ji.com'
        }),

        knex('users').insert({
          user_name: 'MinnieTest',
          first_name:'Minnie',
          last_name: 'Lee',
          email: 'minnie@minnie.com'
        }),

        knex('users').insert({
          user_name: 'NickP',
          first_name:'Nick',
          last_name: 'Piscotta',
          email: 'nick@nick.com'
        })
      ]);
    });
};
