const path = require("path")

module.exports = {
    entry: path.resolve(__dirname, "src/Client.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "all.min.js",
        library: {
            name: 'Equibles',
            type: 'umd',
        },
    },
    mode: "development",
}
