"use strict";

var request = require("supertest");

var app = require("../../index");

describe("Configuration Tests", function () {
  describe("GET /config", function () {
    it("returns a JSON object with application configuration", function _callee() {
      var res;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(request(app).get("/config"));

            case 2:
              res = _context.sent;
              expect(res.statusCode).toEqual(200);
              expect(res.body).toEqual({
                env: process.env.NODE_ENV,
                port: process.env.PORT,
                db_uri: process.env.DB_URI,
                jwt_secret: process.env.JWT_SECRET
              });

            case 5:
            case "end":
              return _context.stop();
          }
        }
      });
    });
  });
});
//# sourceMappingURL=config.test.dev.js.map
