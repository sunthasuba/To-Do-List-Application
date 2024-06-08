const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Fallback route to serve index.html for any other requests
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
