require('dotenv').config();
const { server } = require('./src/app');

// Port from environment variables
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
