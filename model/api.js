'use strict'

const knex = require('./knex_config')

module.exports = {

  findUserById: function(displayName) {
    return knex('users').select().where({
      // id: profileId,
      user_name: displayName
      // email: req.user.emails[0].value
    }).first();
  },

  createUser: function(displayName) {
    return knex('users').insert({
      // id: profileId,
      user_name: displayName
    });
  }

};
