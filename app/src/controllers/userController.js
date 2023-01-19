const User = require('../models/User');
const sendEmail = require('../services/email/nodemailer');
const ejs = require('ejs');
const path = require('path');
const uuid4 = require('uuid4');

const userController = {
    register: async (req, res) => {
        const user = new User(req.body);
        const confirmation_token = uuid4();
        user.confirmation_token = confirmation_token;
        await user.save();

        // make an email with correct infos
        const emailInfos = {
            to: [user.email, process.env.ADMIN_EMAIL],
            subject: "Register validation",

        }

        const template = await ejs.renderFile(path.resolve(__dirname, '../services/email/templates/validateAccount.ejs'), {
            username: `${user.firstName} ${user.lastName}`,
            validation_link: `${process.env.BASE_URL}user/validate-account/${confirmation_token}`
        })

        await sendEmail(emailInfos, template);

        //send email
        res.status(201).send({"message": "Confirmation email has been sent to the indicated address"});
        
    },
    validateAccount: async (req, res) => {
        const token = req.params.token;
        
        const user = await User.findOne({confirmation_token: token});

        if(!user) {
            return res.status(404).send({"message": "Inexistant token"});
        }

        user.active = true;
        user.confirmation_token = null;

        await user.save();

        res.status(200).send({"message": "Account has been successfully validated"});
    }
};

module.exports = userController;