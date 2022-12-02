const request = require('supertest');
const app = require('../app');

let testServer;

beforeAll(() => {
  testServer = app.listen(3000);
});

afterAll((done) => {
  testServer.close(done);
});

describe('GET /api/v1/products', () => {
  it('should be return all producst', async () => {
    const response = await request(app).get('/api/v1/products');

    expect(response.error).toBe(false);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(3);
  });
});

describe('GET /api/v1/products/1', () => {
  it('should be return product(PANTS) by id', async () => {
    const id = 1;
    const response = await request(app).get(`/api/v1/products/${id}`);

    expect(response.error).toBe(false);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.id).toBe(id);
    expect(response.body.code).toBe('PANTS');
  });
});

describe('GET /api/v1/products/2', () => {
  it('should be return product(TSHIRT) by id', async () => {
    const id = 2;
    const response = await request(app).get(`/api/v1/products/${id}`);

    expect(response.error).toBe(false);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.id).toBe(id);
    expect(response.body.code).toBe('TSHIRT');
  });
});

describe('GET /api/v1/products/3', () => {
  it('should be return product(TSHIRT) by id', async () => {
    const id = 3;
    const response = await request(app).get(`/api/v1/products/${id}`);

    expect(response.error).toBe(false);
    expect(response.status).toBe(200);
    expect(response.body).not.toBeNull();
    expect(response.body.id).toBe(id);
    expect(response.body.code).toBe('HAT');
  });
});

describe('GET /api/v1/products/4', () => {
  it('should be return 404 HTTP Code', async () => {
    const id = 4;
    const response = await request(app).get(`/api/v1/products/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });
});

  
