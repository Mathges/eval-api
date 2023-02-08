const {Router} = require('express');
const controllerHandler = require('../utils/controllerHandler');
const userController = require('../controllers/userController')
const bodyValidation = require('../utils/validation/bodyValidation');
const UserInRegister = require('../utils/validation/schemas/UserInRegister');
const CompanyInUpdate = require('../utils/validation/schemas/CompanyInUpdate');
const FreelanceInUpdate = require('../utils/validation/schemas/FreelanceInUpdate');
const verifyToken = require('../middlewares/verifyToken');
const isCompany = require('../middlewares/isCompany');
const isFreelance = require('../middlewares/isFreelance');

const userRouter = new Router();

userRouter.post('/register', bodyValidation(UserInRegister), controllerHandler(userController.register));
userRouter.get('/validate-account/:token', controllerHandler(userController.validateAccount));
userRouter.get('/filter', verifyToken, isCompany, controllerHandler(userController.filter));
userRouter.get('/me', verifyToken, controllerHandler(userController.getMe));
userRouter.patch('/update-freelance', verifyToken, isFreelance, bodyValidation(FreelanceInUpdate), controllerHandler(userController.updateFreelance));
userRouter.patch('/update-company', verifyToken, isCompany, bodyValidation(CompanyInUpdate), controllerHandler(userController.updateCompany));
userRouter.get('/ask-reset-password', controllerHandler(userController.askResetPassword));
userRouter.patch('/reset-password', controllerHandler(userController.resetPassword));
module.exports = userRouter;
