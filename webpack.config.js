const path = require('path');
const webpack = require('webpack');
const alias = require('./alias');
const platform = process.env.PLATFORM || 'web';

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].' + platform + '.js',
        libraryTarget: 'commonjs2'
    },
    plugins: [],
    resolve: {
        alias
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    performance: {
        hints: false
    },
    devtool: process.env.NODE_ENV !== 'production'
        ? '#inline-source-map'
        : false
};

if (process.env.NODE_ENV === 'production') {
    module.exports.plugins = module.exports.plugins.concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
}
