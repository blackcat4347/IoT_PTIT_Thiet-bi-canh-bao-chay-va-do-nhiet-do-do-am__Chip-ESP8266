"use strict";

// Require 'nodemailer'
var nodemailer = require('nodemailer'); // Cấu hình transporter


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tranminhnghia19061993x@gmail.com',
    pass: 'your-password'
  }
}); // API endpoint để gửi email

app.post('/send-alert-email', function (req, res) {
  var mailOptions = {
    from: 'your-email@gmail.com',
    to: 'recipient@example.com',
    subject: 'Cảnh báo mức khí gas cao',
    text: 'Cảnh báo: Mức độ khí gas đã vượt quá 300!'
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});