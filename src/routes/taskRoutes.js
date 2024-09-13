const express = require('express');
const { cache, saveToCache } = require('../utils/redis');
const authMiddleware = require('../middlewares/authMiddleware');
const Task = require('../models/Task');
const router = express.Router();

// Create new task (Admin only)
router.post('/', authMiddleware('admin'), async (req, res) => {
    const { title, description, assignedTo } = req.body;
    try {
        const task = new Task({ title, description, assignedTo });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ message: 'Task creation failed', error: err.message });
    }
});

// Get all tasks (cache results in Redis)
router.get('/', cache('tasks'), async (req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'username');
        saveToCache('tasks', tasks);
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ message: 'Fetching tasks failed', error: err.message });
    }
});

module.exports = router;
