module.exports = (connection) => {
    const books = connection.collection("books");
    return {
        async createOrUpdate({title, slug, authors, isbn, description}) {
            // const books = await booksPromise;
            return books.updateOne(
                {isbn: isbn},
                {$set: {title, slug, authors, isbn, description}},
                {upsert: true}
            );
        },
        async findAll({start, limit}) {
            // const books = await booksPromise;
            return books.find().skip(start * limit).limit(limit).toArray();
        },
        async delete(isbn) {
            // const books = await booksPromise;
            return await books.deleteOne({isbn});
        },
        async findOne(isbn) {
            // const books = await booksPromise;
            return books.findOne(
                {isbn},
                {projection: {_id: 0}}
            );
        }
    }
};