const path = require('path');
const webpack = require('webpack');
const NpmInstallPlugin = require('npm-install-webpack-plugin');
const srcPath = path.resolve(__dirname, '../src');

module.exports = {
    entry: {
        helpers: path.resolve(srcPath, 'index.js')
    },
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: '[name].js',
        libraryTarget: 'commonjs2',
    },
    plugins: [
        new NpmInstallPlugin()
    ],
    resolve: {
        alias: {
            src: srcPath
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: 'babel-loader?presets[]=es2015&presets[]=stage-3',
                exclude: /node_modules/,
            }
        ],
    },
    performance: {
        hints: false,
    },
    devtool: process.env.NODE_ENV !== 'production'
        ? '#inline-source-map'
        : false,
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = module.exports.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ]);
}
