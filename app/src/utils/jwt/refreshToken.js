const decodeToken = require("./decodeToken");
const createToken = require('./createToken')

const newToken = async (jwt) => {
    const decoded = await decodeToken(jwt);

    const userInfos = {
        id: decoded.id,
        isAdmin: decoded.isAdmin
    }; 

    const token = await createToken(userInfos);

    return token;
};

module.exports = newToken;