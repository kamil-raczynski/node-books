const express = require("express");
const app = express();

const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi';

let books;
MongoClient.connect(url, function(err, client) {
    setTimeout(function() {
        books = client.db().collection("books");
    }, 10000);

});
let promise = MongoClient.connect(url).then(function(client) {
    return client.db().collection("books");
});

app.use(express.json());

app.use(function(req, res, next) {
    // console.log("new requst at " + new Date());
    next();
});

app.get("/", function (req, res) {
    res.send("Home");
});

app.post("/book", function(req, res) {
    const {title, authors, isbn, description} = req.body;
    promise.then(function(books) {
        books.updateOne(
            {isbn: isbn},
            { $set: {title, authors, isbn, description} },
            {upsert: true}
        );
    });


    res.json({title, authors, isbn, description});
});

app.get("/book/:isbn", function (req, res) {
    const isbn = req.params.isbn;
    promise
        .then(function (books) {
            return books.findOne(
                {isbn},
                { projection: {_id: 0} }
            );
        })
        .then(function (book) {
            res.json(book);
        });
});

app.use(function(req, res, next) {
    const error = new Error("not found");
    error.status = 404;
    next(error);
});

app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || 500);
    res.json({message: err.message, error: err.stack});
});

module.exports = app;