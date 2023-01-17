const Joi = require('joi');

const UserInRegister = Joi.object({
    lastName: Joi.string().required(),
    firstName: Joi.string().required(),
    address: Joi.string().required(),
    zipCode: Joi
        .string()
        .required()
        .regex(new RegExp(/\b\d{5}\b/)),
    phoneNumber: Joi
        .string()
        .required()
        .regex(new RegExp(/^((\+)33|0|0033)[1-9](\d{2}){4}$/)),
    email: Joi
        .string()
        .required()
        .regex(new RegExp(/^\S+@\S+\.\S+$/)),
    password: Joi
        .string()
        .required()
        .regex(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/)),
    freelance: Joi
        .object({
            dailyTax: Joi.number(),
            experienceYears: Joi.number(),
            skills: Joi.array().items(Joi.string()),
            professions: Joi.array().items(Joi.string()),
            currentTasks: Joi.array().items(Joi.string()),
        })
        .default(null),
    company: Joi
        .object({
            socialReason: Joi.string().required(),
            status: Joi.string(),
            siret: Joi.string().required(),
            headOffice: Joi.string().required(),
        })
        .default(null),
});

module.exports = UserInRegister;