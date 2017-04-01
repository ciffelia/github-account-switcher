const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const uglifySaveLicense = require('uglify-save-license');

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './dest/bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin('./dest'),
    new CopyWebpackPlugin([
      { from: './src/index.html', 'to': './dest/index.html' },
      { from: './src/manifest.json', 'to': './dest/manifest.json' }
    ]),
    new UglifyJSPlugin({
      sourceMap: true,
      output: {
        comments: uglifySaveLicense
      }
    })
  ]
};
