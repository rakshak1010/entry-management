var express = require('express');
var router = express.Router();

let visitor = require('../controllers/visitor');

router.post('/', visitor.initialise);
router.get('/:id/checkout', visitor.checkout);

router.post('/success', visitor.create);

module.exports = router;
