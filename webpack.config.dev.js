const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/index.jsx',
  output: {
    filename: './dest/bundle.js'
  },
  devtool: "source-map",
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
    ])
  ]
};
