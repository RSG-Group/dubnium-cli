const MinifyPlugin = require('babel-minify-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'cli.js',
    path: __dirname
  },
  plugins: [
    new MinifyPlugin(),
    new webpack.BannerPlugin({ banner: '#!/usr/bin/env node', raw: true })
  ],
  devtool: 'source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
}
