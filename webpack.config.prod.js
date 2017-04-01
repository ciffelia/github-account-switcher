const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const uglifySaveLicense = require('uglify-save-license');

module.exports = {
  entry: './src/js/index.jsx',
  output: {
    filename: './dest/bundle.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ["transform-react-jsx"]
      }
    }]
  },
  plugins: [
    new CleanWebpackPlugin('./dest'),
    new CopyWebpackPlugin([
      { from: './src/index.html', 'to': './dest/index.html' },
      { from: './src/manifest.json', 'to': './dest/manifest.json' }
    ]),
    new webpack.optimize.UglifyJsPlugin({
      output: { comments: uglifySaveLicense }
    })
  ]
};
