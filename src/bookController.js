const mapValues = require("lodash.mapvalues");

const wrapWithTryCatch = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// function wrapWithTryCatch(fn) {
//     return async function (req, res, next) {
//         try {
//             await fn(req, res, next);
//         } catch (e) {
//             next(e);
//         }
//     };
// }

function withErrorHandling(api) {
    return mapValues(api, wrapWithTryCatch);
}

module.exports = ({bookService, bookRepository}) => withErrorHandling({
    async createOrUpdate(req, res, next) {
        // HTTP
        const book = req.body;

        // JS
        await bookService.createOrUpdate(book);

        // HTTP
        res.redirect("/book/" + req.body.isbn);
    },
    async delete(req, res, next) {
        // HTTP
        const isbn = req.params.isbn;

        // JS
        await bookRepository.delete(isbn);

        // HTTP
        res.status(204).end();
    },
    async details(req, res, next) {
        // HTTP
        const isbn = req.params.isbn;
        // JS
        const book = await bookRepository.findOne(isbn);
        // HTTP
        if (book) {
            res.format({
                'text/html'() {
                    // reprezentacja HTML
                    res.send("HTML");
                },
                'application/json'() {
                    res.json(book);
                },
                'default'() {
                    res.json(book);
                }
            });
        } else {
            next();
        }
    }
});