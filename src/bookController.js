const mapValues = require("lodash.mapvalues");
const responses = require("./responses");

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
        responses.createOrUpdate(req.body.isbn, res);
    },
    async delete(req, res, next) {
        // HTTP
        const isbn = req.params.isbn;

        // JS
        await bookRepository.delete(isbn);

        // HTTP
        responses.delete(res);
    },
    async details(req, res, next) {
        // HTTP
        const isbn = req.params.isbn;
        const nolayout = req.query.nolayout;
        const layout = nolayout == null ? "layout" : "";
        // JS
        const book = await bookRepository.findOne(isbn);
        // HTTP
        responses.details({book, layout}, res, next);
    }
});