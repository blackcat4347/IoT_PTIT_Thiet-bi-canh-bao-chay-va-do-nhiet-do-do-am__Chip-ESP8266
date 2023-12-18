// Require 'nodemailer'
const nodemailer = require('nodemailer');

// Cấu hình transporter
console.log("okokookok")
let transporter = nodemailer.createTransport({
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
async function sendEmail(req,res) {
  let mailOptions = {
    from: 'tranminhnghiaptit1906@gmail.com',
    to: 'tranminhnghia19061993x@gmail.com',
    subject: 'Cảnh báo mức khí gas cao',
    text: 'Cảnh báo: Mức độ khí gas đã vượt quá 300!'
  };

  try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
      console.log('Email sent successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error sending email');
  }
};

// sendEmail();
module.exports = sendEmail;
