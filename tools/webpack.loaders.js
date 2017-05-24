const webpack = require('webpack');
const path = require('path');


exports.loaders = [
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
    options: {
      presets: ['es2015', 'react'],
    },
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
];
