const fs = require('fs');
const moment = require('moment');
const lightningDealService = require('../services/lightningDealService');
const tokenUtils = require('../utils/tokenUtils');

// Read lightning deals data from JSON file
let lightningDealsData = JSON.parse(fs.readFileSync('lightningDeals.json'));

// Function to check if a lightning deal has expired
function isDealExpired(deal) {
  const expiryTime = moment(deal.expiryTime, 'YYYY-MM-DD HH:mm:ss');
  return moment().isAfter(expiryTime);
}

// Middleware function to check if a lightning deal has expired
function checkDealExpiry(req, res, next) {
  const dealId = req.params.id;
  const deal = lightningDealsData.find((deal) => deal.id === dealId);

  if (!deal) {
    return res.status(404).json({ error: 'Deal not found' });
  }

  if (isDealExpired(deal)) {
    return res.status(400).json({ error: 'Deal has expired' });
  }

  next();
}

// Controller function to get all lightning deals
function getLightningDeals(req, res) {
  // Filter out expired deals
  const unexpiredDeals = lightningDealsData.filter((deal) => !isDealExpired(deal));
  res.json(unexpiredDeals);
}

// Controller function to get a single lightning deal by ID
function getLightningDealById(req, res) {
  const dealId = req.params.id;
  const deal = lightningDealsData.find((deal) => deal.id === dealId);

  if (!deal) {
    return res.status(404).json({ error: 'Deal not found' });
  }

  if (isDealExpired(deal)) {
    return res.status(400).json({ error: 'Deal has expired' });
  }

  res.json(deal);
}

// Controller function to place an order for a lightning deal
function placeOrder(req, res) {
  const dealId = req.params.id;
  const deal = lightningDealsData.find((deal) => deal.id === dealId);

  if (!deal) {
    return res.status(404).json({ error: 'Deal not found' });
  }

  if (isDealExpired(deal)) {
    return res.status(400).json({ error: 'Deal has expired' });
  }

  // Process order logic here...

  res.json({ message: 'Order placed successfully' });
}

module.exports = {
  getLightningDeals,
  getLightningDealById,
  placeOrder,
  checkDealExpiry
};
