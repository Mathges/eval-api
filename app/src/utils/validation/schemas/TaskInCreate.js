const Joi = require('joi');

const TaskInCreate = Joi.object({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    salary: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    professionAwaited: Joi.string().required(),
    skillsAwaited: Joi.array().items(Joi.string()).required(),
});

module.exports = TaskInCreate;
