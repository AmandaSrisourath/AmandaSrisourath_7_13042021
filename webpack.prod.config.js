var path = require("path");

module.exports = {
    mode: "production",
    entry: [],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
};