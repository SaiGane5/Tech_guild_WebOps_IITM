const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'member'], default: 'member' },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('User', userSchema);
