exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          user_name: 'Jiggabot',
          password: 'Ji',
          email: 'ji@ji.com'
        }),
        knex('users').insert({
          user_name: 'MinnieTest',
          password:'Minnie',
          email: 'minnie@minnie.com'
        }),
        knex('users').insert({
          user_name: 'NickP',
          password:'Nick',
          email: 'nick@nick.com'
        })
      ]);
    });
};
