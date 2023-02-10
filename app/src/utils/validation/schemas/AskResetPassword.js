const Joi = require('joi');

const AskResetPassword = new Joi.object({
    email: Joi
    .string()
    .required()
    .regex(new RegExp(/^\S+@\S+\.\S+$/)),
});

module.exports = AskResetPassword;
