const express = require("express");
const app = express();
const bookRoutes = require("./bookRoutes");
const {clientError, serverError} = require("./error");

app.use(express.json());

app.use(function (req, res, next) {
    // console.log("new requst at " + new Date());
    next();
});

app.use("/", bookRoutes);

app.use(clientError);

app.use(serverError);

module.exports = app;