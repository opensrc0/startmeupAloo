import { Router } from 'express'
import config from '../config'
const router = new Router()

var mysql      = require('mysql')
var connection = mysql.createConnection({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});

connection.connect();

connection.query('SELECT * from de_user_emails_phones', function (error, results, fields) {
  if (error) throw error;
  for (var key in results) {
  console.log(key, results[key]);
}
});

connection.end();

// Remove this
import fakeDB from '../fakeDB.js'

router.get('/', (req, res) => {
  setTimeout(() => {
    res.status(200).json(fakeDB)
  }, 300)
})

router.get('/:slug', (req, res) => {
  const index = fakeDB.findIndex(el => el.slug === req.params.slug)
  if (index < 0) {
    res.status(404).json({
      error: 'Post does not exist in db'
    })
  }

  setTimeout(() => {
    res.status(200).json(fakeDB[index])
  }, 300)
})

module.exports = router
