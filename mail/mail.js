const nodemailer = require('nodemailer');
require('dotenv').config();
const express = require('express');
const router = express.Router();
const validator = require('validator');



router.post('/send', async (req, res) => {
    const { name, email, message } = req.body;
    console.log(name, email, message);

    console.log(process.env.GMAIL_USER);

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });
        // 1️⃣ Email to Admin (You)
            // return res.status(500).json({ message: 'Invalid email format' });
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }


        const resive = await transporter.sendMail({
            from: email,
            to: process.env.GMAIL_USER,
            subject: `New contact from ${name}`,
            text: `You got a new message:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
        });

        // 2️⃣ Email to User (Confirmation)
        const send = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: email,
            subject: 'Thank you for contacting us!',
            text: `Hi ${name},\n\nThank you for contacting us. We have received your message:\n\n"${message}"\n\nWe will get back to you soon.\n\nBest regards,\nYour Company Team`
        });
        console.log("work");
            res.status(200).json({ success: true, message: "Emails sent successfully!" });
    
    } catch (err) {
        res.status(400).json({ success: false, error: 'internal error' });
    }
});
module.exports = router;