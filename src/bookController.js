const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/booksapi';

let booksPromise = MongoClient.connect(url, {autoReconnect: false, bufferMaxEntries: 0, useNewUrlParser: true,  useUnifiedTopology: true }).then(function(client) {
    return client.db().collection("books");
});

module.exports = {
    async createOrUpdate (req, res, next) {
        try {
            const {title, authors, isbn, description} = req.body;
            const books = await booksPromise;
            await books.updateOne(
                {isbn: isbn},
                {$set : {title, authors, isbn, description} },
                {upsert: true});
            res.json({title, authors, isbn, description});
        } catch (e) {
            next(e);
        }
    },
    async details (req, res, next) {
        const isbn = req.params.isbn;
        try {
            const books = await booksPromise;
            const book = await books.findOne(
                {isbn},
                {projection: {_id: 0}}
            );
            res.json(book);
        } catch(e) {
            next(e);
        }
    }
};