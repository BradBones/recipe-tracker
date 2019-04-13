const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // This is the entry point of our source code. The code we are working on in development. Aslo added babel polyfill to allow babel to generate ES5 code to replace ES6 exclusive code types (promises, classes etc.)
    entry: ['@babel/polyfill', './src/js/index.js'],
    // Output only gets saved in memory when we do 'npm run start' it does NOT save the output files to the dist folder. To save files to the dist folder after development use 'npm run build'.
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },

    // devServer is our virtual local server used in development mode (see package.json)
    devServer: {
        contentBase: './dist'
    },

    // This plugin injects our html page into the dist folder and adds the correct script tags. Note: This is also virtual in dev (start) and hard-written on build.
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html', // (to be created)
            template: './src/index.html' // source
        })
    ],
    // Used to specify babel-loader on all .js files and to ignore any files in the node modules folder.
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    }
};


