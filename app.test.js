const request = require('supertest');
const { app, server } = require('./app');

afterAll((done) => {
  // Close the server after all tests are done
  server.close(() => {
    done();
  });
});

describe('GET /mean', () => {
  test('should calculate the mean of provided numbers', async () => {
    const response = await request(app).get('/mean?nums=1,2,3,4,5');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mean', value: 3 });
  });

  test('should handle empty input', async () => {
    const response = await request(app).get('/mean');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });
});

describe('GET /median', () => {
  test('should calculate the median of provided numbers', async () => {
    const response = await request(app).get('/median?nums=1,2,3,4,5');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'median', value: 3 });
  });

  test('should handle empty input', async () => {
    const response = await request(app).get('/median');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });
});

describe('GET /mode', () => {
  test('should calculate the mode of provided numbers', async () => {
    const response = await request(app).get('/mode?nums=1,2,2,3,4,4,4,5');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ operation: 'mode', value: 4 });
  });

  test('should handle empty input', async () => {
    const response = await request(app).get('/mode');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'nums are required' });
  });
});

describe('Invalid routes', () => {
  test('should respond with 404 for non-existing routes', async () => {
    const response = await request(app).get('/non-existing-route');
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ error: 'Route not found' });
  });
});

