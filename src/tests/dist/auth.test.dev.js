"use strict";

var app = require('../app');

var request = require('supertest');

var fs = require('fs');

var path = require('path');

describe('Authentication API', function () {
  describe('POST /api/register', function () {
    var newUser = {
      username: 'testuser',
      password: 'testpassword',
      role: 'customer'
    };
    test('should create a new user', function _callee() {
      var response;
      return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(request(app).post('/api/register').send(newUser).expect('Content-Type', /json/).expect(201));

            case 2:
              response = _context.sent;
              expect(response.body.message).toEqual('User created successfully');
              expect(response.body.user.id).toBeDefined();
              expect(response.body.user.username).toEqual(newUser.username);
              expect(response.body.user.role).toEqual(newUser.role);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      });
    });
    test('should return error if missing required fields', function _callee2() {
      var response;
      return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(request(app).post('/api/register').send({
                password: 'testpassword',
                role: 'customer'
              }).expect('Content-Type', /json/).expect(400));

            case 2:
              response = _context2.sent;
              expect(response.body.message).toEqual(expect.stringContaining('required'));

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      });
    });
  });
  describe('POST /api/login', function () {
    test('should authenticate existing user', function _callee3() {
      var response;
      return regeneratorRuntime.async(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(request(app).post('/api/login').send({
                username: 'testuser',
                password: 'testpassword'
              }).expect('Content-Type', /json/).expect(200));

            case 2:
              response = _context3.sent;
              expect(response.body.message).toEqual('Authentication successful');
              expect(response.body.token).toBeDefined();

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      });
    });
    test('should return error if invalid credentials', function _callee4() {
      var response;
      return regeneratorRuntime.async(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(request(app).post('/api/login').send({
                username: 'testuser',
                password: 'wrongpassword'
              }).expect('Content-Type', /json/).expect(401));

            case 2:
              response = _context4.sent;
              expect(response.body.message).toEqual(expect.stringContaining('Invalid username or password'));

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      });
    });
  });
});
//# sourceMappingURL=auth.test.dev.js.map
