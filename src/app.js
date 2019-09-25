const express = require("express");
const app = express();

const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi';

let books;
MongoClient.connect(url, function (err, client) {
    setTimeout(function () {
        books = client.db().collection("books");
    }, 10000);

});
let promise = MongoClient.connect(url).then(function (client) {
    return client.db().collection("books");
});

app.use(express.json());

app.use(function (req, res, next) {
    // console.log("new requst at " + new Date());
    next();
});

app.get("/", function (req, res) {
    res.send("Home");
});

app.post("/book", async function (req, res, next) {
    try {
        const {title, authors, isbn, description} = req.body;
        const books = await promise;
        await books.updateOne(
            {isbn: isbn},
            {$set: {title, authors, isbn, description}},
            {upsert: true}
        );
        res.json({title, authors, isbn, description});
    } catch(e) {
        next(e);
    }

});

app.get("/book/:isbn", async function (req, res, next) {
    try {
        const books = await promise;
        const isbn = req.params.isbn;
        const book = await books.findOne(
            {isbn},
            {projection: {_id: 0}}
        );
        res.json(book);
    } catch(e) {
        next(e);
    }
});

app.use(function (req, res, next) {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
});

module.exports = app;