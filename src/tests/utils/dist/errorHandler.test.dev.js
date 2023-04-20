"use strict";

var errorHandler = require('../../utils/errorHandler');

describe('errorHandler', function () {
  it('should return a 500 status code and error message', function () {
    var err = new Error('Test error');
    var res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    errorHandler(err, null, res, null);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      error: 'Test error'
    });
  });
});
//# sourceMappingURL=errorHandler.test.dev.js.map
