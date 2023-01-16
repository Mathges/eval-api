const nodemailer = require('nodemailer');

const sendEmail = async () => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: process.env.MAIL_ADDRESS, // generated ethereal user
            pass: process.env.MAIL_TOKEN, // generated ethereal password
        },
        // need this because self generated certificate
        tls : { rejectUnauthorized: false }
    });

    let info = await transporter.sendMail({
        to: "mathieu.geslin@ynov.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

};

module.exports = sendEmail;