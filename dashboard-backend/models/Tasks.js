const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    completed: { type: Boolean, default: false, required: true },
    taskName: { type: String }
});

module.exports = mongoose.model('Task', TaskSchema);