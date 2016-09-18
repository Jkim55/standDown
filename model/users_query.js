'use strict'

const knex = require('./knex_config')

function addUser(userData){
  return knex('users').insert(userData)
}

function countOfUser(userName){
  return knex('users').count('user_name').where('user_name', userName);
}

function findUser(userName){
  return knex('users')
  .where('user_name', userName)
  .first()
}

function findUserbyName(userName){
  return knex('users')
    .where('users.user_name', userName).first()
}

function changeUserEmail(){

}

function changeUserPassword(){

}

function changeUserName(){

}

function deleteUser(){

}

module.exports = {
  add: addUser,
  count: countOfUser,
  findUser: findUser,
  findUserbyName: findUserbyName,
}
