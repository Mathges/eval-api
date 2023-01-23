const {Router} = require('express');
const controllerHandler = require('../utils/controllerHandler');
const taskController = require('../controllers/taskController');
const verifyToken = require('../middlewares/verifyToken');
const isCompany = require('../middlewares/isCompany');

const taskRouter = new Router();

taskRouter.post('/create', verifyToken, isCompany, controllerHandler(taskController.create));

module.exports = taskRouter;