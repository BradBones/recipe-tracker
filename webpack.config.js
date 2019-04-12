const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // This is the entry point of our source code. The code we are working on in development.
    entry: './src/js/index.js',
    // Output only gets saved in memory when we do 'npm run start' it does NOT save the output files to the dist folder. To save files to the dist folder after development use 'npm run build'.
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },

    devServer: {
        contentBase: './dist'
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ]
};