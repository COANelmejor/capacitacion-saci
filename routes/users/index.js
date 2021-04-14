var express = require('express');
var router = express.Router();
const verify = require('../../middleware/verifyTokenAPI');

router.get('/', verify, require('./get'));
router.get('/christian', require('./christian'))
router.get('/christian/:id', require('./permisosmd'), require('./christian2'))
router.get('/permisos/:id', require('./permisos'))
router.get('/multiplicadopor5/:numero', require('./multiplicadopor5'))

module.exports = router;
