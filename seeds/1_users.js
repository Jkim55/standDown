exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({
          user_name: 'Jiggabot',
          password: 'Ji'
        }),
        knex('users').insert({
          user_name: 'MinnieTest',
          password:'Minnie'
        }),

        knex('users').insert({
          user_name: 'NickPiscotta',
          password:'Nick'
        })
      ]);
    });
};
