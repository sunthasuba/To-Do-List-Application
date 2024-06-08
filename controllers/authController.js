const { check } = require('express-validator');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validate = require('../middleware/validation');

const register = [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }),
    validate,
    async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = new User({ username, password });
            await user.save();
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            res.status(400).json({ message: 'Error registering user', error });
        }
    }
];

const login = [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password is required').notEmpty(),
    validate,
    async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findOne({ username });
            if (user && (await user.matchPassword(password))) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(400).json({ message: 'Error logging in', error });
        }
    }
];

module.exports = { register, login };
