const { Router } = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");
const taskRouter = require("./task");

const router = new Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/task', taskRouter);

module.exports = router;
