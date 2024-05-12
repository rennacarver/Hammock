const express = require('express')
const router = express.Router()
const passport = require('passport')
const path = require('path')

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'))
})

/* (uninspected)
  Login routes -- This is where we will use the 'local'
  passport authenciation strategy. If success, send to
  /login-success, if failure, send to /login-failure
*/
router.post('/login', passport.authenticate('local', { 
  failureRedirect: '/login-failure', 
  successRedirect: '/login-success'
}), (err, req, res, next) => {
  if (err) next(err);
});

router.get('/login-failure', (req, res, next) => {
  console.log(req.session);
  res.send('Login Attempt Failed.');
});

router.get('/login-success', (req, res, next) => {
  console.log(req.session);
  res.send('Login Attempt was successful.');
});

/* (uninspected)
  Protected Route -- Look in the account controller for
  how we ensure a user is logged in before proceeding.
  We call 'isAuthenticated' to check if the request is 
  authenticated or not. 
*/
router.get('/profile', function(req, res) {
  console.log(req.session)
  if (req.isAuthenticated()) {
    res.json({ message: 'You made it to the secured profie' })
  } else {
    res.json({ message: 'You are not authenticated' })
  }
})

module.exports = router