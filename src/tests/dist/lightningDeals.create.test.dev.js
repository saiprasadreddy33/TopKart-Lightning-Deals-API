"use strict";

var request = require("supertest");

var app = require("../app");

var _require = require("../config/config"),
    connect = _require.connect,
    disconnect = _require.disconnect;

var lightningDealModel = require("../models/lightningDealModel"); // Mock data


var mockLightningDeal = {
  name: "Test Lightning Deal",
  description: "This is a test lightning deal",
  discountPercentage: 20,
  startDate: "2023-05-01T00:00:00.000Z",
  endDate: "2023-05-02T00:00:00.000Z"
};
describe("Test Lightning Deal Creation", function () {
  beforeAll(function _callee() {
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(connect());

          case 2:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  afterAll(function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(lightningDealModel.deleteMany());

          case 2:
            _context2.next = 4;
            return regeneratorRuntime.awrap(disconnect());

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it("Should create a new lightning deal", function _callee3() {
    var res;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(request(app).post("/api/v1/lightningDeals").send(mockLightningDeal).set("Accept", "application/json"));

          case 2:
            res = _context3.sent;
            expect(res.status).toEqual(201);
            expect(res.body.name).toEqual(mockLightningDeal.name);
            expect(res.body.description).toEqual(mockLightningDeal.description);
            expect(res.body.discountPercentage).toEqual(mockLightningDeal.discountPercentage);
            expect(new Date(res.body.startDate).toISOString()).toEqual(mockLightningDeal.startDate);
            expect(new Date(res.body.endDate).toISOString()).toEqual(mockLightningDeal.endDate);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it("Should not create a new lightning deal with missing required fields", function _callee4() {
    var res;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(request(app).post("/api/v1/lightningDeals").send({
              name: "Test Lightning Deal",
              discountPercentage: 20,
              startDate: "2023-05-01T00:00:00.000Z",
              endDate: "2023-05-02T00:00:00.000Z"
            }).set("Accept", "application/json"));

          case 2:
            res = _context4.sent;
            expect(res.status).toEqual(400);
            expect(res.body.error).toBeTruthy();

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
});
//# sourceMappingURL=lightningDeals.create.test.dev.js.map
