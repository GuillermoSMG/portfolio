const { Router } = require('express');
const router = Router();
const { sendMail } = require('nodemailer');

const { transporter } = require('../config/transporter');

router.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  contentHTML = `
    <h1>User Info</h1>
    <ul>
        <li>Username: ${name}</li>
        <li>Email: ${email}</li>
    </ul>
    <p>Message: ${message}</p>
  `;

  const mailOptions = {
    from: 'Guillermo Portfolio',
    to: process.env.EMAIL_USER,
    subject: 'Portfolio Contact Form.',
    html: contentHTML,
  };

  try {
    transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }

  res.sendStatus(200);
});

module.exports = router;
