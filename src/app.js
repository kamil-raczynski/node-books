const express = require("express");
const path = require("path");
const app = express();
const bookRoutes = require("./bookRoutes");
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

module.exports = app;