const { createTransport } = require('nodemailer');

const transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'emma.morar49@ethereal.email',
    pass: 'fKhAxVmYp6zT7XjHzA',
  },
});

module.exports = { transporter };
