require('dotenv').config()
const nodemailer = require("nodemailer");
// create reusable transporter object using the default SMTP transport
let transport = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: process.env.USER_NAME_GMAIL, 
        pass: process.env.GMAIL_APP_PASS, 
    },
});

module.exports = transport