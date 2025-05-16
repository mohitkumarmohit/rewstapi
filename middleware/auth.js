const express = require('express');
const routerr = express.Router();

const jwt = require('jsonwebtoken');
require('dotenv').config();
    console.log("1.1");
routerr.post('/auth', async (req, res) => {
    
    console.log("1.1");
    const { token } = req.body;
    console.log(token);
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);

        return res.status(200).json({ message: 'Invalid token' });
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}
)

module.exports = routerr;
