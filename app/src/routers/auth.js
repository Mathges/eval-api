const {Router} = require('express');
const controllerHandler = require('../utils/controllerHandler');
const authController = require("../controllers/authController");
const verifyToken = require('../middlewares/verifyToken');

const authRouter = new Router();

authRouter.post('/login', controllerHandler(authController.login));
authRouter.post('/refresh', verifyToken, controllerHandler(authController.refresh));

module.exports = authRouter;