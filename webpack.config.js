const path = require('path');

module.exports = {
    entry: './assets/js/game.js',
    output: {
        path: path.resolve(__dirname, 'assets'),
        filename: 'launch.js',
    }
}