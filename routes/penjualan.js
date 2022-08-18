var express = require('express');
var router = express.Router();
var db = require('../db')
var moment = require('moment')
const {formatter } = require('../helper/util.js')
/* GET users listing. */
router.get('/', function(req, res, next) {
   //let kode_jualan =kode_jualan=req.query.kode_jualan || cekrow.rows.length > 0 ? cekrow.rows[0].kode_jualan : ''
   db.query('select detail.barcode, info_barang.nama_barang, detail.jumlah, info_barang.harga_jual, detail.total_harga from detail    join penjualan on penjualan.kode_jualan = detail.kode_jualan join info_barang on detail.barcode = info_barang.barcode ORDER By id_detail')
  .then(cekcek=>db.query('select * from penjualan')
  .then(result=> res.render('penjualan/list',{item:result.rows,details:cekcek.rows,currentPage:'penjualan', formatter,moment
 })))
  
});

module.exports = router;
