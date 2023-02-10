const User = require("../models/User");
const decodeToken = require("./jwt/decodeToken")

const getUserFromToken = async (token) => {
    const decodedToken = await decodeToken(token);

    const user = await User.findOne({id: decodedToken.id});

    return user;
};

module.exports = getUserFromToken;
