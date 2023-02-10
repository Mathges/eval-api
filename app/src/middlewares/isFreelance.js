const getUserFromToken = require("../utils/getUserFromToken");

const isFreelance = async (req, res, next) => {
    const user = await getUserFromToken(req.header("Authorization").slice(7));

    // check Freelance field presence
    if(!user.freelance) {
        return res.status(403).send({"message": "Forbidden"});
    }
    next();
}

module.exports = isFreelance;