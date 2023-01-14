const jwt = require('jsonwebtoken');

const createToken = async (payload) => {
    const userInfos = {
        id: payload.id,
        isAdmin: payload.isAdmin
    };

    const token = jwt.sign(userInfos, process.env.JWT_SECRET, {
        expiresIn: "15m"
    });

    return token;
};

module.exports = createToken;
