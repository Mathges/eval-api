const {Router} = require('express');
const controllerHandler = require('../utils/controllerHandler');
const authController = require('../controllers/authController')
const verifyToken = require('../middlewares/verifyToken');
const bodyValidation = require('../utils/validation/bodyValidation');
const UserInAuth = require('../utils/validation/schemas/UserInAuth');

const authRouter = new Router();

authRouter.post('/login', bodyValidation(UserInAuth), controllerHandler(authController.login));
authRouter.post('/refresh', verifyToken, controllerHandler(authController.refresh));

module.exports = authRouter;