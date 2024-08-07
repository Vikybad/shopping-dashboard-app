const express = require('express');
const router = express.Router();
const Task = require('../models/Tasks');
const auth = require('../middleware/auth');


// Get all orders for a user
router.get('/get-tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id }).sort({ completed: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Add new order
router.post('/add-task', auth, async (req, res) => {
    try {
        const newTask = new Task({
            userId: req.user.id,
            ...req.body
        });
        const task = await newTask.save();
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update task status
router.patch('/update/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { $set: { completed: req.body.completed ? req.body.completed : false } },
            { new: false }
        );
        if (!task) return res.status(404).json({ msg: 'task not found' });
        res.json(task);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;