const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const User = require('../models/User');

describe('Task API', () => {
    let token;

    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/todo-app-test', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const user = new User({ username: 'testuser', password: 'testpassword' });
        await user.save();

        const res = await request(app)
            .post('/api/auth/login')
            .send({ username: 'testuser', password: 'testpassword' });
        token = res.body.token;
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    it('should create a new task', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .set('Authorization', `Bearer ${token}`)
            .send({ text: 'Test Task' });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('_id');
    });

    it('should fetch tasks', async () => {
        const res = await request(app)
            .get('/api/tasks')
            .set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array);
    });
});
