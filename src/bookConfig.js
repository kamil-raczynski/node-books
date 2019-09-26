module.exports = connection => {
    const bookRepository = require("./bookRepository")(connection);
    const bookService = require("./bookService")(bookRepository);
    const bookController = require("./bookController")({bookService, bookRepository});
    const bookRoutes = require("./bookRoutes")(bookController);
    return bookRoutes;
};

