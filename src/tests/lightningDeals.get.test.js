const request = require('supertest');
const app = require('../app');

describe('GET /lightning-deals', () => {
  test('responds with json containing a list of all lightning deals', async () => {
    const response = await request(app).get('/lightning-deals');
    expect(response.status).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual(expect.any(Array));
  });

  test('responds with json containing the specified lightning deal', async () => {
    const response = await request(app).get('/lightning-deals/1');
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
  });

  test('responds with 404 if lightning deal is not found', async () => {
    const response = await request(app).get('/lightning-deals/999');
    expect(response.status).toBe(404);
  });
});
