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
// TODO: transform in /me route
// userRouter.get('/:id', controllerHandler(userController.getById));
userRouter.get('/filter', verifyToken, isCompany, userController.filter);

module.exports = userRouter;