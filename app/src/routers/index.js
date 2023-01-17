const { Router } = require("express");
const authRouter = require("./auth");
const userRouter = require("./user");

const router = new Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);

module.exports = router;
