const Joi = require('joi');

const UserInUpdate = Joi.object({
    lastName: Joi.string(),
    firstName: Joi.string(),
    address: Joi.string(),
    city: Joi.string(),
    zipCode: Joi
        .string()
        .regex(new RegExp(/\b\d{5}\b/)),
    phoneNumber: Joi
        .string()
        .regex(new RegExp(/^((\+)33|0|0033)[1-9](\d{2}){4}$/)),
    email: Joi
        .string()
        .regex(new RegExp(/^\S+@\S+\.\S+$/)),
    password: Joi
        .string()
        .regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)),
    freelance: Joi
        .object({
            dailyTax: Joi.number(),
            experienceYears: Joi.number(),
            skills: Joi.array().items(Joi.string()),
            professions: Joi.array().items(Joi.string()),
        })
});

module.exports = UserInUpdate;