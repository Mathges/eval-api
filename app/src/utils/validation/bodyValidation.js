const bodyValidation = async (req, res, schema) => {
    try {
        await schema.validateAsync(req.body);
        
    } catch(error) {
        return res.status(422).send({"error": error.details[0].message})
    }
}

module.exports = bodyValidation;