const router = require("express").Router();
const MongoClient = require('mongodb').MongoClient;

// const url = 'mongodb://db:27017/booksapi'; // when using docker-compose for full development
const url = 'mongodb://localhost:27017/booksapi';

let promise = MongoClient.connect(url, {autoReconnect: false, bufferMaxEntries: 0, useNewUrlParser: true,  useUnifiedTopology: true }).then(function (client) {
    return client.db().collection("books");
});

router.get("/", function (req, res) {
    res.send("Home");
});

router.post("/book", async function (req, res, next) {
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

router.get("/book/:isbn", async function (req, res, next) {
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

module.exports = router;