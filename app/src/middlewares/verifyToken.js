const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    if(!req.header("Authorization")) {
        res.status(401).send({"message": "Unauthorized"})
    }

    const token = req.header("Authorization").slice(7);

    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        res.status(401).send({"message": "Unauthorized"})
    }

    next();
    
};

module.exports = verifyToken;