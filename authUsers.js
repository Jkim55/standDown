'use strict'

const bcrypt = require('bcrypt')

const userQuery = require('./model/users_query')
// userMODEL <-- change all query naming conventions across controller files

function hashPassword (password){
  return bcrypt.hashSync(password, 10)
}

// function findUser (username){
//   for (let i=0; i<users.length; i++) {
//     let user = users[i]
//     if (user.username === username) {
//       return user
//     }
//   }
//   return
// }
//
// function authenticateUser (username, password) {
//   let user = findUser (username)
//   if (!user) {
//     return false
//   }
//   return bcrypt.compareSync(password, user.passwordHash)
// }

function addUser (username, password) {
  if (!username || !password) {
    return false
  }
  // if (findUser(username)) {
  //   return false
  // }
  let user = {
    user_name: username,
    password: hashPassword(password),      // passwords are never stored in plain text
  }
  return userQuery.add(user)
}

module.exports = {
  // find: findUser,
  // authenticate: authenticateUser,
  add: addUser
}
