const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: ['./app/index'],
  output: {
    path: path.join(__dirname, './public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.css?$/,
        loaders: ['style', 'raw'],
        include: __dirname
      }
    ]
  }
};
