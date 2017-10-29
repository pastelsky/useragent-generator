const webpack = require('webpack')
const path = require('path')
const libraryName = 'library'

const config = {
  entry: {
    index: './index.js',
    os: './constants/os.js',
    device: './constants/device.js',
  },
  target: 'node',
  externals: [require('webpack-node-externals')(), //],
  output: {
    path: __dirname + '/lib',
    filename: '[name].js',
    library: 'UAGenerator',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
}

module.exports = config