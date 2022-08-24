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
router.get('/add', function(req,res){
  res.render('barang/add',{currentPage:'ADD Barang'})
})

// router.post('/add', function(res,req){
//   console.log(req.body)
// //   let barcode = req.body.barcode

// //   let nama = req.body.namaBarang
// //   let jumlah = parseInt(req.body.jumlahBarah || 0)
// //   let hargaBarang = parseInt(req.body.hargaBarang)
// //   let hargaJual = parseInt(req.body.hargaJual)
// //   db.query('insert into info_barang (barcode,nama_barang,jumlah_barang,harga_barang,harga_jual) values($1, $2, $3, $4, $5)',[barcode,nama, jumlah, hargaBarang, hargaJual])
// // .then(coba=>res.redirect('/'))
// res.redirect('/')
// })


module.exports = router;
