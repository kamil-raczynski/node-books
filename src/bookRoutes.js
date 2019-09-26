const router = require('express').Router();
const validateBook = require("./validateBookMiddleware");


module.exports = ({createOrUpdate, details, delete: deleteBook, getList}) => {
    router.post("/book", validateBook, createOrUpdate);
    router.get("/book", getList);
    router.delete("/book/:isbn", deleteBook);
    router.get("/book/:isbn", details);

    return router;
};