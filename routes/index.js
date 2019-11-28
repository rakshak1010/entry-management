var express = require('express');
var router = express.Router();

/* GET home page. */
let host = require('../controllers/host');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome' });
});

router.get('/hosts', host.show_hosts);


module.exports = router;
