var express = require('express');
var router = express.Router();

router.get('/', require('./get'));

module.exports = router;