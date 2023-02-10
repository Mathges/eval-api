const User = require('../models/User');
const createToken = require("../utils/jwt/createToken");
const refreshToken = require("../utils/jwt/refreshToken");
const bcrypt = require('bcrypt');

const authController = {
    login: async (req, res) => {
        const user = await User.findOne({ email: req.body.email });

        const match = await bcrypt.compare(req.body.password, user.password)

        if(!match) {
            // return message is to mask that only password is false, that is a security recommandation
            return res.status(401).send({"message": "Email or password incorrect"});
        }

        if(!user.active) {
            return res.status(401).send({"message": "You must validate account before login"})
        }

        const infos = {
            id: user.id,
            isAdmin: user.isAdmin
        };

        const jwt = await createToken(infos);

        res.status(200).send({ "token": jwt });

    },

    refresh: async (req, res) => {
        if (!req.header("Authorization")) {
            return res.status(422).send({ "error": "missing token" })
        }

        const token = req.header("Authorization").slice(7);

        const refresh = await refreshToken(token);

        res.status(200).send({ "token": refresh })
    },
};

module.exports = authController;
