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
   let kodeJualan =req.params.kode_jualan || ''
  
   db.query('select * from penjualan where kode_jualan = $1', [kodeJualan])
   .then(barang=>db.query('select barcode,nama_barang,harga_jual from info_barang ')
   .then(hei =>db.query('select detail.barcode, info_barang.nama_barang, detail.jumlah, info_barang.harga_jual, detail.total_harga from detail join penjualan on penjualan.kode_jualan = detail.kode_jualan join info_barang on detail.barcode = info_barang.barcode  where detail.kode_jualan = $1 ORDER By id_detail',[kodeJualan])
   .then(akhir=>res.render('penjualan/add',{
      penjualan:barang.rows[0],
      barang:hei.rows,
      currentPage :'edit',
      kodeJualan,
      moment

   }))))
   
   
});

router.post('/show/:kode_jualan',function(req,res){
   console.log(req.body.total_bayar, 'cekcek')
   let invoice = req.body.noInvoice
   let barcode = req.body.kode_barang
   let jumlah = parseInt(req.body.totalBarang)
   db.query(`insert into detail (kode_jualan, barcode, jumlah) values('${invoice}', '${barcode}', ${jumlah})`)
   .then(cek=>db.query('select harga from penjualan where kode_jualan=$1', [invoice]))
   .then(hasilInsert=>db.query('select detail.barcode, info_barang.nama_barang, detail.jumlah, info_barang.harga_jual, detail.total_harga from detail join penjualan on penjualan.kode_jualan = detail.kode_jualan join info_barang on detail.barcode = info_barang.barcode  where detail.kode_jualan = $1 ORDER By id_detail',[invoice])
   .then(hasil=>res.json({hasilPenjualan:hasil.rows,  moment, totalBayar:hasilInsert.rows[0]}))
)
   
  
   
})
router.put('/show/:kode_jualan', function(req,res){
   let kodeJualan =req.params.kode_jualan
   let invoice = req.body.noInvoice
   let kembalian = parseInt(req.body.kembalian)
   let total = parseInt(req.body.total_bayar)
   console.log(req.body, 'cek req body')
   db.query(`update penjualan set total_bayar= ${total}, kembalian = ${kembalian} where kode_jualan = '${invoice}'`)
   .then(hasilbayar=>res.json(hasilbayar))
   
})

module.exports = router;
