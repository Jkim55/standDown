var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})

module.exports = router;


// users page will allow:
  // login
  // create new user
  // edit user information 
