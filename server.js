const express = require('express')
const logger = require('morgan')
//const path = require('path')
const passport = require('passport')
const session = require('express-session')
const LocalStrategy = require('passport-local').Strategy
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')

//added without inspection
const createError = require('http-errors')
const cookieParser = require('cookie-parser')

//import statements
require('dotenv').config()
const db = require('./config/database')
const User = require("./models/user")

const app = express()

//added without inspection
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//initiate morgan
app.use(logger('dev'))

//create route for public folder
//app.use('/static', express.static(path.join(__dirname, 'public')))
//app.use('/static', express.static('public'))
app.use(express.static('public'))

//routes for root page
app.use('/', require('./routes/index'))
app.use('/', require('./routes/auth'))

/*
  Session configuration and utilization of the MongoStore for storing
  the session in the MongoDB database
*/
app.use(express.urlencoded({ extended: false }))
app.use(session({
  secret: 'kuromiblack',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: db.client.s.url })
}))

/*
  Setup the local passport strategy, add the serialize and 
  deserialize functions that only saves the ID from the user
  by default.
  source: https://javascript.plainenglish.io/session-authentication-with-node-js-express-passport-and-mongodb-ffd1eea4521c
*/
const strategy = new LocalStrategy(User.authenticate())
passport.use(strategy)
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(passport.initialize())
app.use(passport.session())

// error handling (uninspected)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});


//enable listening on port 3001
const port = process.env.PORT || 3001

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
})