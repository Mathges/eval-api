const {Router} = require('express');
const controllerHandler = require('../utils/controllerHandler');
const userController = require('../controllers/userController')
const bodyValidation = require('../utils/validation/bodyValidation');
const UserInRegister = require('../utils/validation/schemas/UserInRegister');
const verifyToken = require('../middlewares/verifyToken');
const isCompany = require('../middlewares/isCompany');

const userRouter = new Router();

userRouter.post('/register', bodyValidation(UserInRegister), controllerHandler(userController.register));
userRouter.get('/validate-account/:token', controllerHandler(userController.validateAccount));
userRouter.get('/filter', verifyToken, isCompany, controllerHandler(userController.filter));
userRouter.get('/me', verifyToken, controllerHandler(userController.getMe));
userRouter.patch('/update', verifyToken, controllerHandler(userController.update))

module.exports = userRouter;
