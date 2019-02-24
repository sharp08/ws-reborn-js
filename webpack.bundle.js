const Clean = require("clean-webpack-plugin")
const path = require("path");
module.exports = {
    mode: "production",
    entry: './src/ws-reborn.js',
    output: {
        path: path.resolve(__dirname, "lib"),
        filename: "ws-reborn.min.js",
        library: "WSR",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new Clean('lib')
    ]
}