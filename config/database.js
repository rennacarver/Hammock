const mongoose = require('mongoose')
//const User = require("./models/user")

mongoose.connect(process.env.DATABASE_URL)

const db = mongoose.connection

db.on('connected', function () {
  console.log(`Connected to ${db.name} at ${db.host}:${db.port}`)
})

module.exports = db