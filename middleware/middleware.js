const jwt = require('jsonwebtoken');
const router = require('./auth');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    
    if (!getToken) {
        return res.status(401).json({ message: 'Unauthorized, token missing' });
    }

    try {
        const decoded = jwt.verify(getToken, JWT_SECRET);
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = router;
