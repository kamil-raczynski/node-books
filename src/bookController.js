module.exports = ({bookService, bookRepository}) => ({
    async createOrUpdate (req, res, next) {
        try {
            // HTTP
            // const {title, authors, isbn, description} = req.body;

            // JS
            await bookService.createOrUpdate(req.body);
            // HTTP
            res.redirect("/book/" + req.body.isbn);
        } catch (e) {
            next(e);
        }
    },
    async delete(req, res, next) {
        try {
            const isbn = req.params.isbn;

            await bookRepository.delete(isbn);

            res.status(204).end();
        } catch (e) {
            next(e);
        }
    },
    async details (req, res, next) {
        try {
            // HTTP
            const isbn = req.params.isbn;
            // JS
            const book = await bookRepository.findOne(isbn);
            // HTTP
            if(book) {
                res.json(book);
            } else {
                next();
            }
        } catch(e) {
            next(e);
        }
    }
});