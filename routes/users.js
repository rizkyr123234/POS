var express = require('express');
var router = express.Router();
var db = require('../db')
db.query('select * from satuan')
.then(hasil=> hasil.rows)
.then(result=>console.log(result[0]))
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
