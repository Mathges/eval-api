const User = require("../models/User");
const decodeToken = require("../utils/jwt/decodeToken")

const isAdmin = async (req, res, next) => {
    // decode token
    const token = await decodeToken(req.header("Authorization").slice(7));
    
    // get user by id
    const user = await User.findOne({id: token.id});

    // check Admin field presence
    if(!user.Admin) {
        return res.status(403).send({"message": "Forbidden"});
    }
    next();
}

module.exports = isAdmin;
