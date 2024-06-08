const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
