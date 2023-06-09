"use strict";

var express = require('express');

var router = express.Router();

var lightningDealsController = require('../controllers/lightningDealsController');

router.get('/', lightningDealsController.getUnexpiredDeals);
router.get('/:dealId', lightningDealsController.getDealById);
router.post('/', lightningDealsController.createDeal);
router.put('/:dealId', lightningDealsController.updateDeal);
router.post('/:dealId/orders', lightningDealsController.placeOrder);
router.get('/:orderId/status', lightningDealsController.getOrderStatus);
module.exports = router;
//# sourceMappingURL=lightningDeal.dev.js.map
