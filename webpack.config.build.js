const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    devtool: 'cheap-module-source-map',

    // plugins: [
    //     new webpack.optimize.CommonsChunkPlugin({
    //         names: ['index', 'main']
    //     }),
    //     new CleanWebpackPlugin(['dist'])
    // ],
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'https://addons.redbull.com/us/playingforchange/',
        library: 'pfc',
        libraryTarget: 'amd'
    }

});
