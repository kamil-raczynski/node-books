const express = require("express");
const path = require("path");

module.exports = (connection) => {
    const app = express();
    const bookRepository = require("./bookRepository")(connection);
    const bookService = require("./bookService")(bookRepository);
    const bookController = require("./bookController")({bookService, bookRepository});
    const bookRoutes = require("./bookRoutes")(bookController);
    const {clientError, serverError} = require("./error");

    app.use(express.json());

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "hbs");

    app.use(function (req, res, next) {
        // console.log("new requst at " + new Date());
        next();
    });

    app.use("/", bookRoutes);

    app.use(clientError);

    app.use(serverError);

    return app;
};