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


router.get('/create', function(req, res, next) {
   db.query('insert into penjualan (harga) values (0) returning *')
   .then(create=>res.redirect(`/penjualan`))
  
});

router.get('/show/:kode_jualan', function(req, res, next) {
  
   db.query('select * from penjualan where kode_jualan = $1', [req.params.kode_jualan])
   .then(barang=>db.query('select barcode,nama_barang,harga_jual from info_barang ')
   .then(json=>res.render('penjualan/add',{
      penjualan:barang.rows[0],
      barang:json.rows,
      moment,
      currentPage:"edit"
   })))
   
});

router.post('/show/:kode_jualan',function(req,res){
   let invoice = req.body.noInvoice
   let barcode = req.body.kode_barang
   let jumlah = parseInt(req.body.totalBarang)
   console.log(invoice,barcode,jumlah,'cekcek')
   db.query(`insert into detail(kode_jualan, barcode, jumlah) values(${invoice}, ${barcode}, ${jumlah})`)
   res.redirect(`${invoice}`)
})
router.get('/show/:kode_jualan',function(res,req,){
  
   let kode_jualan =req.params.kode_jualan || ''
   db.query('select detail.barcode, info_barang.nama_barang, detail.jumlah, info_barang.harga_jual, detail.total_harga from detail join penjualan on penjualan.kode_jualan = detail.kode_jualan join info_barang on detail.barcode = info_barang.barcode  where detail.kode_jualan = $1 ORDER By id_detail',[kode_jualan])
   .then(hai=>res.redirect('penjualan/add',{hasilJualan:hai.rows}))
})
module.exports = router;
