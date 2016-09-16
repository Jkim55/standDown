'use strict'

const passport = require("passport")
const Local = require("passport-local")
const users = require("./authUsers")

passport.use(new Local((username, password, done) => {
  let verified = users.authenticate(username, password)
  if (!verified){
    done(null, false)
  }
  let user = users.find(username)
  done(null, user)
}))


passport.serializeUser((user, done) => {
  done(null, user.username)
})

passport.deserializeUser((username, done) => {
  let user = users.find(username)
  done(null, user)
})

module.exports = passport
