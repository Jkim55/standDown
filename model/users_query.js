'use strict'

const knex = require('./knex_config')

function addUser(userObj){
  // console.log('this is fron users_query', userObj);
  return knex('users').insert(userObj)
}

function findUser(){

}

function editUserInfo(){

}

function deleteUser(){

}

module.exports = {
  add:addUser
}
