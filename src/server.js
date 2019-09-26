(async function main() {
    const app = require("./app")(await require("./db"));

    app.listen(3000, function () {
        console.log("Example app listening on port 3000!");
    });
})().catch(console.log);