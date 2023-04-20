const errorHandler = require('../../utils/errorHandler');

describe('errorHandler', () => {
  it('should return a 500 status code and error message', () => {
    const err = new Error('Test error');
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    errorHandler(err, null, res, null);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({ error: 'Test error' });
  });
});
