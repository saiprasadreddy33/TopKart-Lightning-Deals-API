const app = require('../app');
const request = require('supertest');
const fs = require('fs');
const path = require('path');

describe('Authentication API', () => {
  describe('POST /api/register', () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword',
      role: 'customer',
    };

    test('should create a new user', async () => {
      const response = await request(app)
        .post('/api/register')
        .send(newUser)
        .expect('Content-Type', /json/)
        .expect(201);
      expect(response.body.message).toEqual('User created successfully');
      expect(response.body.user.id).toBeDefined();
      expect(response.body.user.username).toEqual(newUser.username);
      expect(response.body.user.role).toEqual(newUser.role);
    });

    test('should return error if missing required fields', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({
          password: 'testpassword',
          role: 'customer',
        })
        .expect('Content-Type', /json/)
        .expect(400);
      expect(response.body.message).toEqual(
        expect.stringContaining('required')
      );
    });
  });

  describe('POST /api/login', () => {
    test('should authenticate existing user', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: 'testuser',
          password: 'testpassword',
        })
        .expect('Content-Type', /json/)
        .expect(200);
      expect(response.body.message).toEqual('Authentication successful');
      expect(response.body.token).toBeDefined();
    });

    test('should return error if invalid credentials', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({
          username: 'testuser',
          password: 'wrongpassword',
        })
        .expect('Content-Type', /json/)
        .expect(401);
      expect(response.body.message).toEqual(
        expect.stringContaining('Invalid username or password')
      );
    });
  });
});
