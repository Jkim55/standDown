'use strict'

const knex = require('./knex_config')

function addUser(userObj){
  return knex('users').insert(userObj)
}

function findUser(userName){
  return knex('users')
    .where('user_name', userName)
}

function countOfUser(userName){
  return knex('users').count('user_name').where('user_name', userName);
}

function editUserInfo(){

}

function deleteUser(){

}

module.exports = {
  add: addUser,
  find: findUser,
  count: countOfUser
}
