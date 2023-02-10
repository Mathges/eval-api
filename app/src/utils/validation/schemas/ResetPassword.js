const Joi = require('joi');

const ResetPassword = new Joi.object({
    token: Joi
        .string()
        .required()
        .uuid(),
    password: Joi
        .string()
        .required()
        .regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)),
});

module.exports = ResetPassword;
