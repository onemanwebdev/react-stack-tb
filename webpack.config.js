var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

var extractScss = new ExtractTextPlugin({ filename: '[name].css' });
var browserSync = new BrowserSyncPlugin({
  server: {
    baseDir: ['public']
  }
});
var stylelint = new StyleLintPlugin({ context: './source' });

module.exports = {
  devtool: 'source-map',
  entry: './source/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      { // SCSS
        test: /\.scss$/,
        use: extractScss.extract({
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'sass-loader', options: { sourceMap: true, includePaths: ['./source/sass'] }},
            { loader: 'resolve-url-loader' }
          ],
          fallback: 'style-loader'
        })
      },
      { // JavaScript
        test: /\.js$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'eslint-loader'}
        ]
      }
    ]
  },
  plugins: [
    extractScss,
    browserSync,
    stylelint
  ]
};