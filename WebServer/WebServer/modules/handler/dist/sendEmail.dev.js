"use strict";

// Require 'nodemailer'
var nodemailer = require('nodemailer'); // Cấu hình transporter


console.log("okokookok");
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'tranminhnghiaptit1906@gmail.com',
    // bi loi nay thi copy loi len stack overflow
    pass: 'boyp jxjw hvsd wkxo'
  }
});

function sendEmail(req, res) {
  var mailOptions, info;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          mailOptions = {
            from: 'tranminhnghiaptit1906@gmail.com',
            to: 'tranminhnghia19061993x@gmail.com',
            subject: 'Cảnh báo mức khí gas cao',
            text: 'Cảnh báo: Mức độ khí gas đã vượt quá 300!'
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 4:
          info = _context.sent;
          console.log('Email sent: ' + info.response);
          res.status(200).send('Email sent successfully');
          console.log('Email sent successfully');
          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.status(500).send('Error sending email');

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

; // sendEmail();

module.exports = sendEmail;