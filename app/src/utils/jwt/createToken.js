const jwt = require('jsonwebtoken');

const createToken = async (payload) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m"
    });

    return token;
};

module.exports = createToken;
