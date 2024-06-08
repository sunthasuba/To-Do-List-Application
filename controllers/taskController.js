const Task = require('../models/Task');

const getTasks = async (req, res) => {
    const tasks = await Task.find({ userId: req.user._id });
    res.json(tasks);
};

const createTask = async (req, res) => {
    const task = new Task({
        text: req.body.text,
        completed: false,
        userId: req.user._id
    });
    await task.save();
    res.json(task);
};

const updateTask = async (req, res) => {
    const task = await Task.findOneAndUpdate({ _id: req.params.id, userId: req.user._id }, req.body, { new: true });
    res.json(task);
};

const deleteTask = async (req, res) => {
    await Task.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    res.json({ message: 'Task deleted' });
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
