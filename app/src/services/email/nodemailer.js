const nodemailer = require('nodemailer');

const sendEmail = async (content, template) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAIL_ADDRESS,
            pass: process.env.MAIL_TOKEN,
        },
        // need this because self generated certificate
        tls : { rejectUnauthorized: false }
    });

    await transporter.sendMail({
        to: content.to,
        subject: content.subject,
        html: template,
    });

};

module.exports = sendEmail;