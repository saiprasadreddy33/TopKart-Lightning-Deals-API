const express = require('express');
const router = express.Router();

router.use('/lightningDeals', require('./lightningDeals'));

module.exports = router;
