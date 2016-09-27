'use strict'

const bcrypt = require("bcrypt");
const passport = require("passport")
const Local = require("passport-local")

const userModel = require('./model/users_query')

passport.use(new Local((username, password, done) => {
  userModel.findUser(username)
  .then((userData) => {
    if(userData){
      bcrypt.compare(password, userData.password,
      function(err, res){
        if(res) {
          done(null, userData)
        } else {
          done(null, false)
        }
      })
    }
    else {
      done(null, false)
    }
  })
  .catch(function(err){
    done(err)
  })
}))

passport.serializeUser((userData, done) => {
  done(null, userData.user_name)
})

// passport.deserializeUser((userData, done) => {
//   done(null, userData);
// }) // this deserializeUser() only captures user_name within req.body

passport.deserializeUser((username, done) => {
  userModel.findUser(username)
  .then((userData) => {
    done(null, userData)
  })
  .catch(function(err){
    done(err)
  })
})

module.exports = passport
