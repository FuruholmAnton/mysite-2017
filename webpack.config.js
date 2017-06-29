<<<<<<< HEAD
"use strict";
require('babel-polyfill');
var webpack = require('webpack');
var path = require('path');
var loaders = require('./webpack.loaders');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var DashboardPlugin = require('webpack-dashboard/plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
=======
const webpack = require('webpack');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// require('babel-polyfill');
import pkg from './package.json';

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');
>>>>>>> Work

const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || "8888";

loaders.push({
  test: /\.scss$/,
  loaders: [
		'style-loader',
		{
			loader: 'css-loader',
			options: {
				importLoaders: 1,
				modules: true,
				localIdentName: '[name]__[local]___[hash:base64:5]',
			}
		},
		'postcss-loader',
		'sass-loader'
	],
  exclude: ['node_modules']
});

<<<<<<< HEAD
loaders.push({
  test: /\.sass$/,
  loaders: ['style-loader', 'css-loader?importLoaders=1', 'postcss-loader', 'sass-loader'],
  exclude: ['node_modules']
});

module.exports = {
  entry: [
		'babel-polyfill',
    'react-hot-loader/patch',
    './src/index.jsx', // your app's entry point
  ],
  devtool: process.env.WEBPACK_DEVTOOL || 'eval-source-map',
  output: {
    publicPath: '/',
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
=======
const loaders = [
  {
    test: /\.(js|jsx)$/,
    include: [
      path.resolve(__dirname, 'src'),
    ],
    exclude: [
      path.resolve(__dirname, 'src/static'),
      path.resolve(__dirname, 'src/views'),
      path.resolve(__dirname, 'src/server.js'),
      path.resolve(__dirname, 'src/server.babel.js'),
      path.resolve(__dirname, 'src/server*'),
      path.resolve(__dirname, 'src/main.js'),
    ],
    loader: 'babel-loader',
    query: {
      // https://github.com/babel/babel-loader#options
      cacheDirectory: isDebug,

      presets: ['es2015', 'react'],
    },
  },
  {
    test: /\.scss$/,
    include: [
      path.resolve(__dirname, 'src/assets/scss'),
      path.resolve(__dirname, 'src/pages'),
    ],
    loader: extractSass.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader'] }),
  },
  {
      test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'file',
  },
  {
      test: /\.(woff|woff2)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url?prefix=font/&limit=5000',
  },
  {
      test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'url?limit=10000&mimetype=application/octet-stream',
  },
  {
      test: webpackIsomorphicToolsPlugin.regular_expression('images'),
      loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
  },
];


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: [
      /* 'babel-polyfill', */
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      'react-hot-loader/patch',
      './app-client.js',
      ],
  },
  output: {
    path: path.resolve(__dirname, './src/static/'),
    filename: 'bundle.js',
    publicPath: '/assets/',
>>>>>>> Work
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
<<<<<<< HEAD
    loaders
  },
  devServer: {
    contentBase: "./public",
    // It suppress everything except error, so it has to be set to false as well
    // to see success build.
    noInfo: false,
    // enable HMR
    hot: true,
    // embed the webpack-dev-server runtime into the bundle
    inline: true,
    // serve index.html in place of 404 responses to allow HTML5 history
    historyApiFallback: true,
    // It suppress error shown in console, so it has to be set to false.
    quiet: false,
    port: PORT,
    host: HOST
=======
    rules: loaders,
>>>>>>> Work
  },
  plugins: [
		new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true
    }),
    new DashboardPlugin(),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      files: {
        css: ['style.css'],
        js: [ "bundle.js"],
      }
    }),
  ]
};
