const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/booksapi';

let booksPromise = MongoClient.connect(url, {bufferMaxEntries: 0, useNewUrlParser: true }).then(function(client) {
    return client.db();
});

module.exports = booksPromise;