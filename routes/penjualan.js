var express = require('express');
var router = express.Router();
var db = require('../db')
var moment = require('moment')
const {formatter } = require('../helper/util.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
   let kode_jualan =req.query.invoice || ''
   db.query('select detail.barcode, info_barang.nama_barang, detail.jumlah, info_barang.harga_jual, detail.total_harga from detail join penjualan on penjualan.kode_jualan = detail.kode_jualan join info_barang on detail.barcode = info_barang.barcode  where detail.kode_jualan = $1 ORDER By id_detail',[kode_jualan])
  .then(cekcek=>db.query('select * from penjualan')
  .then(result=> res.render('penjualan/list',{item:result.rows,details:cekcek.rows,currentPage:'penjualan', formatter,moment
 })))
  
});

router.get('/add', function(req, res, next) {
   db.query('select barcode, nama_barang, harga_jual from info_barang')
   .then(barang=> res.render('penjualan/add', {
      currentPage:'nambah gan!', 
      barang:barang.rows[0]
   }))
  
});
router.post('/start', function(req, res, next) {
   db.query('insert into penjualan (harga) values (0) returning *')
   .then(json=>res.json(json.rows))
   
  
});
module.exports = router;
