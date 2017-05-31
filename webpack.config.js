const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

require('babel-polyfill');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

const __DEV__ = process.env.NODE_ENV === 'development';

const webpackIsomorphicToolsPlugin =
  // webpack-isomorphic-tools settings reside in a separate .js file
  // (because they will be used in the web server code too).
  new WebpackIsomorphicToolsPlugin(require('./tools/webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)
  .development();

const extractSass = new ExtractTextPlugin({
  // filename: "public/[name].[contenthash].css",
  filename: path.resolve(__dirname, 'src/static/css/style.css'),
  disable: process.env.NODE_ENV === 'development',
  allChunks: true,
});


const config = {

  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].js',
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/components'),
      Pages: path.resolve(__dirname, './src/pages'),
      Layouts: path.resolve(__dirname, './src/layouts'),
      Core: path.resolve(__dirname, './src/core'),
      SVG: path.resolve(__dirname, './src/assets/svg'),
      Images: path.resolve(__dirname, './src/assets/images'),
    },
    extensions: ['.js', '.jsx'],
    // unsafeCache: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack demo',
    }),
  ],
};


const clientConfig = merge([
  config,
  {
    name: 'client',
    target: 'web',

    context: path.resolve(__dirname, 'src'),
    entry: {
      main: [
        'babel-polyfill',
        'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
        './app-client.js',
      ],
    },

    output: merge([
      config.output,
      {
        filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
        chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
      },
    ]),

    devtool: __DEV__ ? 'source-map' : false,

  },
]);


const serverConfig = merge([
  config,
  {
    name: 'server',
    target: 'node',

    entry: {
      client: ['babel-polyfill', './src/server.js'],
    },

    output: merge([
      config.output,
      {
        filename: 'server.js',
        libraryTarget: 'commonjs2',
      },
    ]),

  },
]);


module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: [
      /* 'babel-polyfill', */
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './app-client.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, './src/static/'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/components'),
      Pages: path.resolve(__dirname, './src/pages'),
      Layouts: path.resolve(__dirname, './src/layouts'),
      Core: path.resolve(__dirname, './src/core'),
      SVG: path.resolve(__dirname, './src/assets/svg'),
      Images: path.resolve(__dirname, './src/assets/images'),
    },
    extensions: ['.js', '.jsx'],
    // unsafeCache: true,
  },
  devtool: 'source-map',
  module: {
    rules: [{
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
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, 'src/assets/scss'),
          path.resolve(__dirname, 'src/pages'),
        ],
        loader: extractSass.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => ([
                  require('postcss-cssnext')(),
                ]),
              },
            },
            'sass-loader',
          ],
        }),
      },
      {
        test: webpackIsomorphicToolsPlugin.regular_expression('images'),
        loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
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
    ],
  },
  plugins: [

    extractSass,
    webpackIsomorphicToolsPlugin,

    // new webpack.optimize.OccurenceOrderPlugin(), // webpack 1.x
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),

    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    // }),
    // new webpack.optimize.DedupePlugin(),
    // new webpack.optimize.OccurenceOrderPlugin(),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: false },
    //   mangle: true,
    //   sourcemap: false,
    //   beautify: false,
    //   dead_code: true
    // })
  ],
};
