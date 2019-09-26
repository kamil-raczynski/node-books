const router = require('express').Router();
const {createOrUpdate, details, delete: deleteBook} = require("./bookController");
const validateBook = require("./validateBookMiddleware");

router.post("/book", validateBook, createOrUpdate);
router.delete("/book/:isbn", deleteBook);
router.get("/book/:isbn", details);

module.exports = router;