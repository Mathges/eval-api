const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    if(!req.header("Authorization")) {
        return res.status(401).send({"message": "Unauthorized"})
    }

    const token = req.header("Authorization").slice(7);

    try {
        jwt.verify(token, process.env.JWT_SECRET);        
        next();
    } catch (error) {
        return res.status(401).send({"message": "Unauthorized"})
    }
    
};

module.exports = verifyToken;