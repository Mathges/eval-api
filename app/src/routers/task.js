const {Router} = require('express');
const controllerHandler = require('../utils/controllerHandler');
const taskController = require('../controllers/taskController');
const verifyToken = require('../middlewares/verifyToken');
const isCompany = require('../middlewares/isCompany');

const taskRouter = new Router();

taskRouter.post('/create', verifyToken, isCompany, controllerHandler(taskController.create));
taskRouter.patch('/add-proposal', verifyToken, isCompany, controllerHandler(taskController.addProposal));
taskRouter.patch('/handle-proposal-response', verifyToken, controllerHandler(taskController.handleProposalResponse));
taskRouter.get('', verifyToken, controllerHandler(taskController.getOne));
    
module.exports = taskRouter;