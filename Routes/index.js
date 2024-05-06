const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

router.get('/api', (req, res) => {
  res.send('Welcome the API page.');
});

module.exports = router