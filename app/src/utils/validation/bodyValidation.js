const bodyValidation = (schema) => {
    return async (req, res, next) => {
        try {
        await schema.validateAsync(req.body);
        next();
        } catch (error) {
        return res.status(422).send({"error": error.details[0].message})
        } 
    } 
}

module.exports = bodyValidation;