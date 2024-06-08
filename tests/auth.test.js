const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Ensure this points to your server file

describe('Auth API', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/todo-app-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({ username: 'testuser', password: 'testpassword' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });
});
