const {bookLink} = require("./links");

module.exports = {
    createOrUpdate(isbn, res) {
        res.redirect(bookLink(isbn));
    },
    list(books, res) {
        res.format({
            "default"() {
                res.json(books);
            },
            "text/html"() {
                res.render("books", {books: books.map(book => ({...book, link: bookLink(book.isbn)}))});
            },
            "application/json"() {
                res.json(books);
            }
        });
    },
    details({book, layout}, res, next) {
        book ? res.format({
            "default"() {
                res.json(book);
            },
            "text/html"() {
                res.render("book", {book, layout});
            },
            "application/json"() {
                res.json(book);
            }

        }) : next();
    },
    delete(res) {
        res.status(204).end();
    }
}