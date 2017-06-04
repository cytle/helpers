const path = require('path')
const webpack = require('webpack')
const NpmInstallPlugin = require('npm-install-webpack-plugin')

module.exports = {
  entry: {
    helpers: path.resolve(__dirname, '../src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../lib'),
    filename: '[name].js',
    libraryTarget: 'umd',
  },
  plugins: [
    new NpmInstallPlugin()
  ],
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
}

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
  ])
}
