const User = require("../models/User");
const getUserFromToken = require("../utils/getUserFromToken");

const isCompany = async (req, res, next) => {
    const user = await getUserFromToken(req.header("Authorization").slice(7));

    // check company field presence
    if(!user.company) {
        return res.status(403).send({"message": "Forbidden"});
    }
    next();
}

module.exports = isCompany;