const express = require("express");
const app = express();

app.use(function(req, res, next) {
    // throw new Error("oh nooooo");
    console.log("new requst at " + new Date());
    next(new Error("new error"));
});

app.use(function(req, res, next) {
    console.log("new requst at " + new Date());
    next();
});

app.use(function(req, res, next) {
    console.log("new requst at " + new Date());
    next();
});

app.get("/", function (req, res) {
    res.send("Hello World!");
});


app.use(function(err, req, res, next) {
    res.status(500);
    res.json({message: err.message, error: err.stack});
});

app.listen(3000, function () {
    console.log("Example app listening on port 3000!");
});