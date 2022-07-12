const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = () => [
  new webpack.ProgressPlugin(),
  new HtmlWebpackPlugin({
    title: 'app for managing users',
    template: './src/index.html',
    minify: false,
    favicon: './src/assets/images/favicon.png',
  }),
  new MiniCSSExtractPlugin({
    filename: 'styles/[name].css',
  }),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /en/),
  new ESLintPlugin({
    extensions: ['.mjs', '.js', '.jsx'],
  }),
];
