module.exports = () => {
    const books = {};

    return {
        async createOrUpdate(book) {
            books[book.isbn] = book;
        },
        async delete(isbn) {
            delete books[isbn];
        },
        async findOne(isbn) {
            return books[isbn];
        }
    };
};