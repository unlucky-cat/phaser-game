const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './project/js/index.js',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'js/game.js',
    },
    devServer: {
        contentBase: './project'
    },
    plugins: [
        /*new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './project/index.html'
        })*/
    ]
}