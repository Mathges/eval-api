const Joi = require('joi');

const UserInAuth = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = UserInAuth;