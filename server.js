const express = require('express')
const logger = require('morgan')
//const path = require('path')
const passport = require('passport')

//added without inspection
const createError = require('http-errors');
const cookieParser = require('cookie-parser');

require('dotenv').config()
require('./config/database')

const app = express()

//added without inspection
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//initiate morgan
app.use(logger('dev'))

//create route for public folder
//app.use('/static', express.static(path.join(__dirname, 'public')))
//app.use('/static', express.static('public'))
app.use(express.static('public'))

//routes for root page
app.use('/', require('./routes/index'))
app.use('/', require('./routes/auth'))

// error handling (uninspected)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

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