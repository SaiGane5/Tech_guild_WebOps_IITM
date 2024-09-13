const socketIo = require('socket.io');

let io;

function initWebSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*', // Allow all origins (adjust as needed)
        },
    });

    io.on('connection', (socket) => {
        console.log('New client connected: ', socket.id);

        // Listen for real-time task updates
        socket.on('taskUpdated', (task) => {
            // Broadcast the task update to all clients
            io.emit('taskUpdated', task);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
}

module.exports = { initWebSocket, io };
