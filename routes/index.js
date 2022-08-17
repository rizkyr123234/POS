var express = require('express');
var router = express.Router();
var db = require('../db')

db.query('select * from satuan')
.then(hasil=> hasil.rows[0])
.then(result=>console.log(result))
/* GET home page. */
router.get('/', function(req, res, next) {
  
  
});

module.exports = router;
