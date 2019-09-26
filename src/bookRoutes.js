const router = require('express').Router();
const bookRepository = require("./bookRepository");
const bookService = require("./bookService")(bookRepository);
const {createOrUpdate, details, delete: deleteBook, getList} = require("./bookController")({bookService, bookRepository});
const validateBook = require("./validateBookMiddleware");

router.post("/book", validateBook, createOrUpdate);
router.get("/book", getList);
router.delete("/book/:isbn", deleteBook);
router.get("/book/:isbn", details);

module.exports = router;