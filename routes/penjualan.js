var express = require('express');
var router = express.Router();
var db = require('../db')
var moment = require('moment')
const {formatter } = require('../helper/util.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
  db.query('select * from penjualan')
  .then(hasil=> hasil.rows)
  .then(result=>res.render('penjualan/list',{
    item:result,
    currentPage:'penjualan',
    formatter,
    moment
  }))
});

module.exports = router;
