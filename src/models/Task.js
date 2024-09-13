const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['todo', 'in-progress', 'completed'], default: 'todo' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Task', taskSchema);
