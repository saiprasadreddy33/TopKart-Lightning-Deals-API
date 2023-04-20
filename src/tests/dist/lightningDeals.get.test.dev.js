"use strict";

var request = require('supertest');

var app = require('../app');

describe('GET /lightning-deals', function () {
  test('responds with json containing a list of all lightning deals', function _callee() {
    var response;
    return regeneratorRuntime.async(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return regeneratorRuntime.awrap(request(app).get('/lightning-deals'));

          case 2:
            response = _context.sent;
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual(expect.any(Array));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    });
  });
  test('responds with json containing the specified lightning deal', function _callee2() {
    var response;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap(request(app).get('/lightning-deals/1'));

          case 2:
            response = _context2.sent;
            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
            expect(response.body).toEqual(expect.objectContaining({
              id: 1,
              title: 'Example lightning deal',
              description: 'This is an example lightning deal',
              discount: 20,
              startDate: expect.any(String),
              endDate: expect.any(String)
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  test('responds with 404 if lightning deal is not found', function _callee3() {
    var response;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap(request(app).get('/lightning-deals/999'));

          case 2:
            response = _context3.sent;
            expect(response.status).toBe(404);

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});
//# sourceMappingURL=lightningDeals.get.test.dev.js.map
