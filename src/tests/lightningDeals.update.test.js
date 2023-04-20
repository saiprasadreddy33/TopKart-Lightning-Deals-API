const request = require('supertest');
const app = require('../../app');
const { generateToken } = require('../../utils/tokenUtils');
const lightningDealModel = require('../../models/lightningDealModel');
const authMiddleware = require('../../middleware/authMiddleware');

describe('PUT /lightning-deals/:id', () => {
  let token;
  let lightningDeal;
  let id;

  beforeAll(async () => {
    // generate token for authentication
    token = await generateToken({ userId: 'testuser' });

    // create a new lightning deal in the database
    lightningDeal = {
      title: 'Test Lightning Deal',
      description: 'This is a test lightning deal',
      discountPercentage: 30,
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 1000 * 60 * 60 * 24), // 24 hours from now
    };
    const result = await lightningDealModel.create(lightningDeal);
    id = result._id.toString();
  });

  afterAll(async () => {
    // delete the lightning deal from the database
    await lightningDealModel.deleteOne({ _id: id });
  });

  it('should return 401 unauthorized if user is not authenticated', async () => {
    const response = await request(app)
      .put(`/lightning-deals/${id}`)
      .send({ title: 'Updated Title' });
    expect(response.statusCode).toBe(401);
  });

  it('should return 404 not found if lightning deal does not exist', async () => {
    const response = await request(app)
      .put(`/lightning-deals/nonexistent-id`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title' });
    expect(response.statusCode).toBe(404);
  });

  it('should return 403 forbidden if user is not authorized to update lightning deal', async () => {
    // create a new user to generate a different token for authentication
    const otherUserId = 'otheruser';
    const otherToken = await generateToken({ userId: otherUserId });

    const response = await request(app)
      .put(`/lightning-deals/${id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({ title: 'Updated Title' });
    expect(response.statusCode).toBe(403);
  });

  it('should update lightning deal and return 200 ok if user is authorized to update lightning deal', async () => {
    const response = await request(app)
      .put(`/lightning-deals/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Title' });
    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe('Updated Title');
  });
});
