"use strict";

var request = require('supertest');

var app = require('../../app');

var _require = require('../../utils/tokenUtils'),
    generateToken = _require.generateToken;

var lightningDealModel = require('../../models/lightningDealModel');

var authMiddleware = require('../../middleware/authMiddleware');

describe('PUT /lightning-deals/:id', function () {
  var token;
  var lightningDeal;
  var id;
  beforeAll(function _callee() {
    var result;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(generateToken({
              userId: 'testuser'
            }));

          case 2:
            token = _context.sent;
            // create a new lightning deal in the database
            lightningDeal = {
              title: 'Test Lightning Deal',
              description: 'This is a test lightning deal',
              discountPercentage: 30,
              startTime: new Date(),
              endTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 24) // 24 hours from now

            };
            _context.next = 6;
            return regeneratorRuntime.awrap(lightningDealModel.create(lightningDeal));

          case 6:
            result = _context.sent;
            id = result._id.toString();

          case 8:
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
            return regeneratorRuntime.awrap(lightningDealModel.deleteOne({
              _id: id
            }));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  it('should return 401 unauthorized if user is not authenticated', function _callee3() {
    var response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(request(app).put("/lightning-deals/".concat(id)).send({
              title: 'Updated Title'
            }));

          case 2:
            response = _context3.sent;
            expect(response.statusCode).toBe(401);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
  it('should return 404 not found if lightning deal does not exist', function _callee4() {
    var response;
    return regeneratorRuntime.async(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap(request(app).put("/lightning-deals/nonexistent-id").set('Authorization', "Bearer ".concat(token)).send({
              title: 'Updated Title'
            }));

          case 2:
            response = _context4.sent;
            expect(response.statusCode).toBe(404);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
  it('should return 403 forbidden if user is not authorized to update lightning deal', function _callee5() {
    var otherUserId, otherToken, response;
    return regeneratorRuntime.async(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            // create a new user to generate a different token for authentication
            otherUserId = 'otheruser';
            _context5.next = 3;
            return regeneratorRuntime.awrap(generateToken({
              userId: otherUserId
            }));

          case 3:
            otherToken = _context5.sent;
            _context5.next = 6;
            return regeneratorRuntime.awrap(request(app).put("/lightning-deals/".concat(id)).set('Authorization', "Bearer ".concat(otherToken)).send({
              title: 'Updated Title'
            }));

          case 6:
            response = _context5.sent;
            expect(response.statusCode).toBe(403);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
  it('should update lightning deal and return 200 ok if user is authorized to update lightning deal', function _callee6() {
    var response;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap(request(app).put("/lightning-deals/".concat(id)).set('Authorization', "Bearer ".concat(token)).send({
              title: 'Updated Title'
            }));

          case 2:
            response = _context6.sent;
            expect(response.statusCode).toBe(200);
            expect(response.body.title).toBe('Updated Title');

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
});
//# sourceMappingURL=lightningDeals.update.test.dev.js.map
