var express = require('express');
var router = express.Router();

const verify = require('../../middleware/verifyTokenAPI')

router.get('/', verify, require('./get'));
router.post('/', verify, require('./post'));

module.exports = router;