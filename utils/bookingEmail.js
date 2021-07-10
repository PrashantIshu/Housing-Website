const nodemailer = require('nodemailer');

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    secureConnection: true,
    transportMethod: 'SMTP',
    pool: true,
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    connectionTimeout: 5 * 60 * 1000
});
// console.log(transporter);

// 2) Define the email options
const mailOptions = {
    from: `Heading ${process.env.EMAIL_USERNAME}`,
    to: options.email,
    subject: options.subject,
    text: options.message
    // html:
  };
//   console.log(mailOptions);

  // 3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
