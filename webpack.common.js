const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        filename: "ws-reborn.min.js",
        library: "WSR",
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    devServer:{
        port:65431
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
    plugins:[
        new HtmlWebpackPlugin("dist")
    ]
}