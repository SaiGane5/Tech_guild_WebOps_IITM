const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (requiredRole) => async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user || (requiredRole && user.role !== requiredRole)) {
            return res.status(403).json({ message: 'Access denied' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;
