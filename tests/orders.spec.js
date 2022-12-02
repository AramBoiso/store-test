const request = require('supertest');
const app = require('../app');

let testServer;
let credentials = {
  email: 'admin@admin.com',
  password: 'pass2022'
}

beforeAll(() => {
  testServer = app.listen(5000);
});

afterAll((done) => {
  testServer.close(done);
});

describe('POST /api/v1/orders', () => {
    it('Order without promotion', async () => {
        const login = await request(app).post('/api/v1/auth/login')
            .send(credentials);

        const token = login.body.token

        const response = await request(app).post('/api/v1/orders')
          .set('Authorization', `bearer ${token}`)
          .send({
            items:[
            { productId: 1, amount: 1},
            { productId: 2, amount: 1},
            { productId: 3, amount: 1},
            ]
          });
      
      expect(response.error).toBe(false);
      expect(response.status).toBe(201);
      expect(response.body).not.toBeNull();
      expect(response.body.order.subtotal).toBeCloseTo(32.5);
      expect(response.body.order.total).toBeCloseTo(32.5);
      expect(response.body.order.discount).toBe(0);
    
  });
});

describe('POST /api/v1/orders', () => {
    it('Order with promotion 2x1 in PANTS', async () => {
        const login = await request(app).post('/api/v1/auth/login')
          .send(credentials);

        const token = login.body.token

        const response = await request(app).post('/api/v1/orders')
          .set('Authorization', `bearer ${token}`)
          .send({
            items:[
            { productId: 1, amount: 2},
            { productId: 2, amount: 1}
            ]
          });
      
      expect(response.error).toBe(false);
      expect(response.status).toBe(201);
      expect(response.body).not.toBeNull();
      expect(response.body.order.subtotal).toBe(30);
      expect(response.body.order.total).toBe(25);
      expect(response.body.order.discount).toBe(5);
    
  });
});

describe('POST /api/v1/orders', () => {
    it('Order with promotion 2x1 in PANTS', async () => {
        const login = await request(app).post('/api/v1/auth/login')
          .send(credentials);

        const token = login.body.token

        const response = await request(app).post('/api/v1/orders')
          .set('Authorization', `bearer ${token}`)
          .send({
            items:[
            { productId: 1, amount: 1},
            { productId: 2, amount: 4}
            ]
          });
      
      expect(response.error).toBe(false);
      expect(response.status).toBe(201);
      expect(response.body).not.toBeNull();
      expect(response.body.order.subtotal).toBe(85);
      expect(response.body.order.total).toBe(81);
      expect(response.body.order.discount).toBe(4);
    
  });
});

describe('POST /api/v1/orders', () => {
    it('Order with promotion 2x1 in PANTS', async () => {
        const login = await request(app).post('/api/v1/auth/login')
          .send(credentials);

        const token = login.body.token

        const response = await request(app).post('/api/v1/orders')
          .set('Authorization', `bearer ${token}`)
          .send({
            items:[
            { productId: 1, amount: 3},
            { productId: 2, amount: 3},
            { productId: 3, amount: 1}
            ]
          });
      
      expect(response.error).toBe(false);
      expect(response.status).toBe(201);
      expect(response.body).not.toBeNull();
      expect(response.body.order.subtotal).toBeCloseTo(82.5);
      expect(response.body.order.total).toBeCloseTo(74.5);
      expect(response.body.order.discount).toBe(8);
    
  });
});