const express = require('express');
const navrouter = express.Router();
const authrouter = require('../routes/authRoutes.js')
const mailrouter = require('../mail/mail.js')
const middlewarerouter = require('../middleware/auth.js')
const jwt = require('jsonwebtoken');
require('dotenv').config();

// const express = require('express');
// const routerr = express.Router();
console.log("1");

navrouter.post('/login',authrouter);
navrouter.post('/register',authrouter);
navrouter.post('/send',mailrouter);

navrouter.post('/auth', async (req, res) => {
    
    const { token } = req.body;
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized, token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user.id);

        return res.status(200).json({ message: 'valid token' });
    } catch (err) {
        return res.status(401).json({ message: 'user not authorized' });
    }
}
)

// module.exports = routerr;
module.exports = navrouter;