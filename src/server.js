(async function main() {
    const connection = await require("./connection");
    const app = require("./app")(connection);

    app.listen(3000, function () {
        console.log("Example app listening on port 3000!");
    });
})().catch(console.log);