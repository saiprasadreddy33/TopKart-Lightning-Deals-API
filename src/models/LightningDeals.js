const moment = require('moment');

class LightningDeal {
  constructor(name, actualPrice, finalPrice, totalUnits, availableUnits, expiryTime) {
    this.name = name;
    this.actualPrice = actualPrice;
    this.finalPrice = finalPrice;
    this.totalUnits = totalUnits;
    this.availableUnits = availableUnits;
    this.expiryTime = moment(expiryTime);
  }

  isExpired() {
    return moment().isAfter(this.expiryTime);
  }

  reduceInventory(quantity) {
    if (quantity > this.availableUnits) {
      throw new Error('Insufficient inventory');
    }
    this.availableUnits -= quantity;
  }
}

module.exports = LightningDeal;
