const Html = require('html-webpack-plugin')
module.exports = {
    mode: "development",
    entry: './src/index.js',
    devServer: {
        port: 65431
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
        new Html(),
    ]
}