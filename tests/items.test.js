import request from 'supertest';
import app from '../app.js';

describe('GET /', () => {
    it('should return 200 and a welcome message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Bienvenido a la API de Mercado Libre Challenge');
    });
});

describe('GET /unknown', () => {
    it('should return 404 for an unknown route', async () => {
        const response = await request(app).get('/unknown');
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Not found');
    });
});

describe('GET /api/items/:id', () => {
    it('should return 200 and item details', async () => {
        const response = await request(app).get('/api/items/MLA1136552401');
        expect(response.statusCode).toBe(200);
        expect(response.body.item).toHaveProperty('id');
        expect(response.body.item).toHaveProperty('title');
        expect(response.body.item).toHaveProperty('price');
        expect(response.body.item.price).toHaveProperty('currency');
        expect(response.body.item.price).toHaveProperty('amount');
        expect(response.body.item.price).toHaveProperty('decimals');
    });

    it('should return 404 if the item is not found', async () => {
        const response = await request(app).get('/api/items/invalid_id');
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Item not found');
    });
});

describe('GET /api/items', () => {
    it('should return 400 if the query parameter is missing', async () => {
        const response = await request(app).get('/api/items');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Query parameter "q" is required');
    });

    it('should return 200 and a list of items', async () => {
        const response = await request(app).get('/api/items?q=suavizante');
        expect(response.statusCode).toBe(200);
        expect(response.body.items).toBeInstanceOf(Array);
        expect(response.body.items.length).toBeLessThanOrEqual(4);
    });

    it('should return 400 if no query parameter is provided', async () => {
        const response = await request(app).get('/api/items');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Query parameter "q" is required');
    });
});
