const path = require('path')

module.exports = {
    entry: './index.js',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'bundle'),
        filename: 'bellagio.js'
    },
    devServer: {
        publicPath: '/',
        liveReload: true,
        port: 8080,
    },
}