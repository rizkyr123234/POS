var express = require('express');
var router = express.Router();
var db = require('../db')
db.connect();
db.query('select * from satuan')
.then(hasil=> hasil.rows)
.then(result=>console.log(result))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
