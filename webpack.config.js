const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // Where files should be sent once they are bundled
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index.bundle.js',
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 3000,
        watchContentBase: true,
        historyApiFallback: {
            index: "/Budget"
        },
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            mimetype: "image/png",
                            encoding: true,
                        },
                    },
                ],
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.svg$/,
                use: "svg-url-loader"
            },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: "./index.html"
    })],
}