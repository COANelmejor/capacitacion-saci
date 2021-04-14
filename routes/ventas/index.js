var express = require('express');
var router = express.Router();

router.get('/', require('./get'));
router.use('/facturas', require('./facturas'))

module.exports = router;