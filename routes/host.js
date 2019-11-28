var express = require('express');
var router = express.Router();

let host = require('../controllers/host'); 	 	

router.get('/', host.show_create);
router.post('/', host.create);

module.exports = router;
