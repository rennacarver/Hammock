const express = require('express')
const logger = require('morgan')

require('dotenv').config()
require('./config/database')

const app = express()

app.use(logger('dev'))

app.use('/', require('./Routes/index'))

const port = process.env.PORT || 3001

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
})