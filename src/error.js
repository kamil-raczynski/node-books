module.exports = {
    clientError(req, res, next) {
        const error = new Error("not found");
        error.status = 404;
        next(error);
    },
    serverError(err, req, res, next) {
        res.status(err.status || 500);
        res.json({message: err.message, error: err.stack});
    }
};