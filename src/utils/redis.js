const Redis = require('ioredis');
const redis = new Redis(); // Defaults to localhost:6379

// Cache middleware
const cache = (key, expiration = 60) => async (req, res, next) => {
    try {
        const cachedData = await redis.get(key);
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        } else {
            // Proceed to next middleware
            next();
        }
    } catch (err) {
        console.error('Redis cache error:', err);
        next();
    }
};

// Save to cache
const saveToCache = async (key, data, expiration = 60) => {
    try {
        await redis.setex(key, expiration, JSON.stringify(data));
    } catch (err) {
        console.error('Redis save error:', err);
    }
};

module.exports = { cache, saveToCache };
