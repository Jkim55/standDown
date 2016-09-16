// 'use strict'
//
// const bcrypt = require('bcrypt')
//
// const userModel = require('./model/users_query')
// // userMODEL <-- change all query naming conventions across controller files
//
// // function hashPassword (password){
// //   return bcrypt.hashSync(password, 8)
// // }
//
// function addUser (username, password, email) {
//
//   userModel.find(username)
//     .then((userData) => {
//       if (userData.length === 0){
//         let userData = {
//           user_name: username,
//           password: hashPassword(password),      // passwords are never stored in plain text
//           email: email
//         }
//         return userModel.add(userData)
//       }
//     })
//     console.log('user exists');
//     return false
//   }
// }
//
// module.exports = {
//   // authenticate: authenticateUser,
//   authAddUser: addUser
// }
