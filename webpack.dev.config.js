var path = require("path");

module.exports = {
    mode: "development",
    entry: ["./src/index.js"],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    watch: true,
    devtool: "source-map",
};