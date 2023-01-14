const jwt = require('jsonwebtoken');

const decodeToken = async (token) => {
    const decoded = jwt.decode(token);

    return decoded;
};

module.exports = decodeToken;