const User = require('../models/User');
const sendEmail = require('../services/email/nodemailer');
const ejs = require('ejs');
const path = require('path');

const userController = {
    register: async (req, res) => {
        const user = new User(req.body);

        await user.save();

        // later: create a validation token

        // make an email with correct infos
        const emailInfos = {
            to: user.email,
            subject: "Register validation",

        }

        const template = await ejs.renderFile(path.resolve(__dirname, '../services/email/templates/validateAccount.ejs'), {
            username: `${user.firstName} ${user.lastName}`,
            validation_link: 'https://google.com'
        })

        await sendEmail(emailInfos, template);

        //send email
        res.status(201).send({"message": "Confirmation email has been sent to the indicated address"});
        
    },
};

module.exports = userController;