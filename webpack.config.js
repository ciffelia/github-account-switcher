const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BabiliWebpackPlugin = require("babili-webpack-plugin");

const isProduction = process.env.NODE_ENV === 'production';
const sourceMapEnabled = !isProduction;
const minifyEnabled = isProduction;

let plugins = [
  new CleanWebpackPlugin('./dest'),
  new CopyWebpackPlugin([
    { from: './src/index.html', 'to': './dest/index.html' },
    { from: './src/manifest.json', 'to': './dest/manifest.json' }
  ])
];

if(minifyEnabled) {
  plugins.push(
    new BabiliWebpackPlugin({}, {
      // https://github.com/shinnn/uglify-save-license/blob/master/index.js#L7
      comments: /@preserve|@cc_on|\bMIT\b|\bMPL\b|\bGPL\b|\bBSD\b|\bISCL\b|\(c\)|License|Copyright/mi
    })
  );
}

const babelESNextRule = {
  test: /\.jsx?$/, exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: [
        ['transform-object-rest-spread', { useBuiltIns: true }],
        'babel-plugin-transform-class-properties'
      ]
    }
  }
};
const babelJSXRule = {
  test: /\.jsx$/, exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true,
      plugins: [
        'transform-react-jsx'
      ]
    }
  }
};

module.exports = {
  entry: './src/js/index.jsx',
  output: {
    filename: './dest/bundle.js'
  },
  devtool: sourceMapEnabled ? 'source-map' : false,
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [babelESNextRule, babelJSXRule]
  },
  plugins
};
