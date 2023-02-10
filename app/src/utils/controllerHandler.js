// this is to limit try/catch blocks further
const controllerHandler = (controller) => async (req, res) => {
    try {
        await controller(req, res);
    } catch (error) {
        //return handleError(req, res, error);
        console.log(error);
        res.status(500).send(error);
    }
};

module.exports = controllerHandler;
