"use strict";

var fs = require('fs');

var moment = require('moment');

var lightningDealService = require('../services/lightningDealService');

var tokenUtils = require('../utils/tokenUtils'); // Read lightning deals data from JSON file


var lightningDealsData = JSON.parse(fs.readFileSync('lightningDeals.json')); // Function to check if a lightning deal has expired

function isDealExpired(deal) {
  var expiryTime = moment(deal.expiryTime, 'YYYY-MM-DD HH:mm:ss');
  return moment().isAfter(expiryTime);
} // Middleware function to check if a lightning deal has expired


function checkDealExpiry(req, res, next) {
  var dealId = req.params.id;
  var deal = lightningDealsData.find(function (deal) {
    return deal.id === dealId;
  });

  if (!deal) {
    return res.status(404).json({
      error: 'Deal not found'
    });
  }

  if (isDealExpired(deal)) {
    return res.status(400).json({
      error: 'Deal has expired'
    });
  }

  next();
} // Controller function to get all lightning deals


function getLightningDeals(req, res) {
  // Filter out expired deals
  var unexpiredDeals = lightningDealsData.filter(function (deal) {
    return !isDealExpired(deal);
  });
  res.json(unexpiredDeals);
} // Controller function to get a single lightning deal by ID


function getLightningDealById(req, res) {
  var dealId = req.params.id;
  var deal = lightningDealsData.find(function (deal) {
    return deal.id === dealId;
  });

  if (!deal) {
    return res.status(404).json({
      error: 'Deal not found'
    });
  }

  if (isDealExpired(deal)) {
    return res.status(400).json({
      error: 'Deal has expired'
    });
  }

  res.json(deal);
} // Controller function to place an order for a lightning deal


function placeOrder(req, res) {
  var dealId = req.params.id;
  var deal = lightningDealsData.find(function (deal) {
    return deal.id === dealId;
  });

  if (!deal) {
    return res.status(404).json({
      error: 'Deal not found'
    });
  }

  if (isDealExpired(deal)) {
    return res.status(400).json({
      error: 'Deal has expired'
    });
  } // Process order logic here...


  res.json({
    message: 'Order placed successfully'
  });
}

module.exports = {
  getLightningDeals: getLightningDeals,
  getLightningDealById: getLightningDealById,
  placeOrder: placeOrder,
  checkDealExpiry: checkDealExpiry
};
//# sourceMappingURL=lightningDealsController.dev.js.map
