const express = require('express');
const cors = require('cors');
const { createServer } = require('http');
const { initWebSocket } = require('./utils/websocket');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const { connectDB } = require('./config/db');

const app = express();
const server = createServer(app); // For WebSockets

// Middleware
app.use(express.json());
app.use(cors());

// Initialize DB Connection
connectDB();

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

// Initialize WebSocket
initWebSocket(server);

// Export app and server
module.exports = { app, server };
