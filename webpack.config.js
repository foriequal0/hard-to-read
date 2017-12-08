const path = require('path');
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'hard-to-read.js'
    },
    target: 'web',
    plugins: [
        new CopyWebpackPlugin([
            // Copy directory contents to {output}/
            { from: 'assets' },
        ])
    ]
};
