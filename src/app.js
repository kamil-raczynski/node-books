const express = require("express");
const path = require("path");
const bookConfig = require("./bookConfig");
const {clientError, serverError} = require("./error");

module.exports = (connection) => {
    const app = express();

    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "hbs");

    app.use(express.json());
    app.use("/", bookConfig(connection));
    app.use(clientError);
    app.use(serverError);

    return app;
};