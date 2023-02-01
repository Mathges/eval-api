const User = require("../models/User");

const isAdmin = async (req, res, next) => {
    const user = await getUserFromToken(req.header("Authorization").slice(7));

    // check Admin field presence
    if(!user.Admin) {
        return res.status(403).send({"message": "Forbidden"});
    }
    next();
}

module.exports = isAdmin;
