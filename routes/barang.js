var express = require('express');
var router = express.Router();
var db = require('../db')
const {formatter } = require('../helper/util.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.query('select * from info_barang')
  .then(hasil=> hasil.rows)
  .then(result=>res.render('barang/list',{
    item:result,
    currentPage:'barang',
    formatter
  }))
});

module.exports = router;
