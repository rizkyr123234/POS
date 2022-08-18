var express = require('express');
var router = express.Router();
var db = require('../db')

db.query('select * from satuan')
.then(hasil=> hasil.rows[0])
.then(result=>console.log(result))
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{title: 'express'})
  
});
router.get('/login', function(req, res, next) {
    res.redirect('penjualan')
    
  });
router.get('/logout',function(req,res){
    res.rendirec('/')
})

module.exports = router;
