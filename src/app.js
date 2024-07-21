const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define a route for sending email
app.post("/send-email", (req, res) => {
  const { fullname, email, subject, message } = req.body;

  // Create transporter using nodemailer
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "petkovicstefan36@gmail.com", // Replace with your Gmail address
      pass: "noucviynlqvaiabo", // Replace with your Gmail password
    },
  });

  // Email content
  const mailOptions = {
    from: "petkovicstefan36@gmail.com",
    to: "petkovicstefan36@gmail.com", // Replace with recipient email address
    subject: subject,
    text: `
      Name: ${fullname}\n
      Email: ${email}\n
      Message: ${message}
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Error: Unable to send email" });
    } else {
      console.log("Email sent: " + info.response);
      res
        .status(200)
        .json({ success: true, message: "Email sent successfully" });
    }
  });
});

// Start server
app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port ${port}`);
});
