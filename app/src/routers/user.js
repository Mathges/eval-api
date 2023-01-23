const {Router} = require('express');
const controllerHandler = require('../utils/controllerHandler');
const userController = require('../controllers/userController');
const bodyValidation = require('../utils/validation/bodyValidation');
const UserInRegister = require('../utils/validation/schemas/UserInRegister');

const userRouter = new Router();

userRouter.post('/register', bodyValidation(UserInRegister), controllerHandler(userController.register));
userRouter.get('/validate-account/:token', controllerHandler(userController.validateAccount));
userRouter.get('/:id', controllerHandler(userController.getById));

module.exports = userRouter;