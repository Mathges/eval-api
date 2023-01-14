const UserInAuth = require("../utils/validation/schemas/UserInAuth");
const bodyValidation = require("../utils/validation/bodyValidation");
const User = require('../models/User');
const createToken = require("../utils/jwt/createToken");
const decodeToken = require("../utils/jwt/decodeToken");
const refreshToken = require("../utils/jwt/refreshToken");
const bcrypt = require('bcrypt');
const hash = require("../utils/bcrypt/hash");
const authController = {
    login: async (req, res) => {
        await bodyValidation(req, res, UserInAuth);

        // get user by email
        const user = await User.findOne({ email: req.body.email });
        // later: compare bcrypt hashes
        const match = await bcrypt.compare(req.body.password, user.password)

        if(match === false) {
            return res.status(401).send({"message": "Email or password incorrect"});
        }

        const jwt = await createToken(user);

        res.status(200).send({ "token": jwt });

    },

    refresh: async (req, res) => {
        if (!req.header("Authorization")) {
            res.status(422).send({ "error": "missing token" })
        }

        const token = req.header("Authorization").slice(7);

        const refresh = await refreshToken(token);

        res.status(200).send({ "token": refresh })
    },
};

module.exports = authController;
