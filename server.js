const express = require('express')
const logger = require('morgan')

const app = express()

app.use(logger('dev'))

app.use('/', require('./routes/index'))

const port = process.env.PORT || 3001

app.listen(port, function() {
  console.log(`Express app running on port ${port}`)
})