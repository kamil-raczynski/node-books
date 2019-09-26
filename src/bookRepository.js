const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/booksapi';

let booksPromise = MongoClient.connect(url, {bufferMaxEntries: 0, useNewUrlParser: true }).then(function(client) {
    return client.db().collection("books");
});

module.exports = {
    async createOrUpdate({title, slug, authors, isbn, description}) {
        const books = await booksPromise;
        return books.updateOne(
            {isbn: isbn},
            {$set : {title, slug, authors, isbn, description} },
            {upsert: true}
        );
    },
    async findAll() {
        const books = await booksPromise;
        return books.find().toArray();
    },
    async delete(isbn) {
        const books = await booksPromise;
        return await books.deleteOne({isbn});
    },
    async findOne(isbn) {
        const books = await booksPromise;
        return books.findOne(
            {isbn},
            { projection: {_id: 0} }
        );
    }
};