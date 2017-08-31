const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  output: {
    publicPath: '/',
    path: 'lib/assets/css',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['jsx-loader?harmony', 'babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(['css', 'sass']) },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('main.css', {allChunks: true}),
  ]
};