const router = require('express').Router();
const validateBook = require("./validateBookMiddleware");
const {BOOK, BOOK_COLLECTION} = require("./links").resources;

module.exports = ({createOrUpdate, details, delete: deleteBook, getList}) => {
    router.post(BOOK_COLLECTION, validateBook, createOrUpdate);
    router.get(BOOK_COLLECTION, getList);
    router.delete(BOOK, deleteBook);
    router.get(BOOK, details);

    return router;
};