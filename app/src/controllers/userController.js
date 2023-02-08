const User = require('../models/User');
const sendEmail = require('../services/email/nodemailer');
const hash = require('../utils/bcrypt/hash');
const ejs = require('ejs');
const path = require('path');
const uuid4 = require('uuid4');
const getUserFromToken = require('../utils/getUserFromToken');
const ResetPassword = require('../models/ResetPassword');

const userController = {
    register: async (req, res) => {
        const user = new User(req.body);

        const confirmation_token = uuid4();
        user.confirmation_token = confirmation_token;

        const hashed = await hash(user.password);
        user.password = hashed
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

        sendEmail(emailInfos, template);

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
    },

    filter: async (req, res) => {
        const {firstName, lastName, city, professions, minTax, maxTax} = req.query;

        const filterConditions = {};

        if (firstName) {
            filterConditions.firstName = { $regex: firstName, $options: "i" }
        }
        if (lastName) {
            filterConditions.lastName = { $regex: lastName, $options: "i" }
        }
        if (city) {
            filterConditions.city = { $regex: city, $options: "i" }
        }
        if (professions) {
            filterConditions['freelance.professions'] = professions
        }

        if(minTax && maxTax) {
            filterConditions['freelance.dailyTax'] = {$gte: minTax, $lte: maxTax}
        }

        if(minTax && !maxTax) {
            filterConditions['freelance.dailyTax'] = {$gte: minTax}
        }

        if(maxTax && !minTax) {
            filterConditions['freelance.dailyTax'] = {$lte: maxTax}
        }

        const response = await User.find(filterConditions);
        
        if(response.length === 0) {
            return res.status(200).send({"message": "No users were found"})
        }

        res.status(200).send(response);
    },

    getMe: async (req, res) => {
        const user = await getUserFromToken(req.header("Authorization").slice(7));

        return res.status(200).send(user);
    },

    updateFreelance: async (req,res) => {
        const user = await getUserFromToken(req.header("Authorization").slice(7));

        const update = await User.findOneAndUpdate({id: user.id}, req.body, {
            new: true
        });

        res.status(200).send(update);
    },

    updateCompany: async (req,res) => {
        const user = await getUserFromToken(req.header("Authorization").slice(7));

        const update = await User.findOneAndUpdate({id: user.id}, req.body, {
            new: true
        });

        res.status(200).send(update);
    },

    askResetPassword: async (req, res) => {

        const token = uuid4();

        const resetPasswordBody = {
            email: req.body.email,
            token,
            date: Date.now()
             
        }

        const resetPassword = new ResetPassword(resetPasswordBody);
        await resetPassword.save();

        const emailInfos = {
            to: req.body.email,
            subject: "reset password"
        }
        
        const template = await ejs.renderFile(path.resolve(__dirname, '../services/email/templates/resetPassword.ejs'), {
            // redirect to front form later, for now call api route directly
            link: `${process.env.BASE_URL}/user/reset-password/${token}`
        });

        sendEmail(emailInfos, template);

        res.status(200).send()

    },

    resetPassword: async (req, res) => {
        const resetPassword = await ResetPassword.find({token: req.body.token});

        // timestamp must be less than 15min
        const resetPasswordTime = new Date(resetPassword[0].date);
        const currentTime = new Date(Date.now());

        const timeDiff = (currentTime - resetPasswordTime)/1000/60;

        if(timeDiff > 15) {
            return res.status(422).send({"message": "Time exceeds limit, please resend a demand"})
        }

        const password = await hash(req.body.password);
        await User.findOneAndUpdate({email: resetPassword[0].email}, {password: password});

        res.status(200).send()
    }
};

module.exports = userController;
