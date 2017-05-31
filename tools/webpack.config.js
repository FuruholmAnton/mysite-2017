const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
import AssetsPlugin from 'assets-webpack-plugin';
import pkg from '../package.json';

require('babel-polyfill');

const isDebug = !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose');
const isAnalyze = process.argv.includes('--analyze') || process.argv.includes('--analyse');

const __DEV__ = process.env.NODE_ENV === 'development';

const webpackIsomorphicToolsPlugin =
  // webpack-isomorphic-tools settings reside in a separate .js file
  // (because they will be used in the web server code too).
  new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools-configuration'))
  // also enter development mode since it's a development webpack configuration
  // (see below for explanation)
  .development();

const extractSass = new ExtractTextPlugin({
  // filename: "public/[name].[contenthash].css",
  filename: path.resolve(__dirname, '../src/static/css/style.css'),
  disable: process.env.NODE_ENV === 'development',
  allChunks: true,
});


const config = {
  context: path.resolve(__dirname, '..'),

  output: {
    path: path.resolve(__dirname, '../build/public/assets'),
    publicPath: '/assets/',
    pathinfo: isVerbose,
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../src'),
        ],
        // exclude: [
        //   path.resolve(__dirname, '../src/static'),
        //   path.resolve(__dirname, '../src/views'),
        //   path.resolve(__dirname, '../src/server.js'),
        //   path.resolve(__dirname, '../src/server.babel.js'),
        //   path.resolve(__dirname, '../src/server*'),
        //   path.resolve(__dirname, '../src/main.js'),
        // ],
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: isDebug,

          // https://babeljs.io/docs/usage/options/
          babelrc: false,
          presets: [
            // A Babel preset that can automatically determine the Babel plugins and polyfills
            // https://github.com/babel/babel-preset-env
            ['env', {
              targets: {
                browsers: pkg.browserslist,
              },
              modules: false,
              useBuiltIns: false,
              debug: false,
            }],
            // Experimental ECMAScript proposals
            // https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-
            'stage-2',
            // JSX, Flow
            // https://github.com/babel/babel/tree/master/packages/babel-preset-react
            'react',
            // Optimize React code for the production build
            // https://github.com/thejameskyle/babel-react-optimize
            ...isDebug ? [] : ['react-optimize'],
          ],
          plugins: [
            // Adds component stack to warning messages
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-source
            ...isDebug ? ['transform-react-jsx-source'] : [],
            // Adds __self attribute to JSX which React will use for some warnings
            // https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-react-jsx-self
            ...isDebug ? ['transform-react-jsx-self'] : [],
          ],
        },
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, '../src/assets/scss'),
          path.resolve(__dirname, '../src/pages'),
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
  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../src/components'),
      Pages: path.resolve(__dirname, '../src/pages'),
      Layouts: path.resolve(__dirname, '../src/layouts'),
      Core: path.resolve(__dirname, '../src/core'),
      SVG: path.resolve(__dirname, '../src/assets/svg'),
      Images: path.resolve(__dirname, '../src/assets/images'),
    },
    extensions: ['.js', '.jsx'],
    // unsafeCache: true,
  },

  // Don't attempt to continue if there are any errors.
  bail: !isDebug,

  cache: isDebug,

  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },
};


const clientConfig = {
  ...config,

  name: 'client',
  target: 'web',

  entry: {
    client: [
      'babel-polyfill',
      './src/client.js',
    ],
  },

  output: {
    ...config.output,
    filename: isDebug ? '[name].js' : '[name].[chunkhash:8].js',
    chunkFilename: isDebug ? '[name].chunk.js' : '[name].[chunkhash:8].chunk.js',
  },

  plugins: [
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': true,
      '__DEV__': isDebug,
    }),

    // Emit a file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, '../build'),
      filename: 'assets.json',
      prettyPrint: true,
    }),

    // Move modules that occur in multiple entry chunks to a new entry chunk (the commons chunk).
    // http://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: 3,
    }),

    ...isDebug ? [] : [
      // Minimize all JavaScript output of chunks
      // https://github.com/mishoo/UglifyJS2#compressor-options
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true, // React doesn't support IE8
          warnings: isVerbose,
          unused: true,
          dead_code: true,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
    ],
  ],

  // Choose a developer tool to enhance debugging
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: isDebug ? 'cheap-module-source-map' : false,

  // Some libraries import Node modules but don't use them in the browser.
  // Tell Webpack to provide empty mocks for them so importing them works.
  // https://webpack.github.io/docs/configuration.html#node
  // https://github.com/webpack/node-libs-browser/tree/master/mock
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },

};


const serverConfig = {
  ...config,

  name: 'server',
  target: 'node',

  entry: {
    server: ['babel-polyfill', './src/server.js'],
  },

  output: {
    ...config.output,
    filename: '../../server.js',
    libraryTarget: 'commonjs2',
  },

  module: {
    ...config.module,
    // Override babel-preset-env configuration for Node.js
    rules: config.module.rules.map(rule => (rule.loader !== 'babel-loader' ? rule : {
      ...rule,
      query: {
        ...rule.query,
        presets: rule.query.presets.map(preset => (preset[0] !== 'env' ? preset : ['env', {
          targets: {
            node: pkg.engines.node.match(/(\d+\.?)+/)[0],
          },
          modules: false,
          useBuiltIns: false,
          debug: false,
        }])),
      },
    })),
  },

  externals: [
    /^\.\/assets\.json$/,
    (context, request, callback) => {
      const isExternal =
        request.match(/^[@a-z][a-z/.\-0-9]*$/i) &&
        !request.match(/\.(css|less|scss|sss)$/i);
      callback(null, Boolean(isExternal));
    },
  ],

  plugins: [
    // Define free variables
    // https://webpack.github.io/docs/list-of-plugins.html#defineplugin
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      'process.env.BROWSER': false,
      __DEV__: isDebug,
    }),

    // Do not create separate chunks of the server bundle
    // https://webpack.github.io/docs/list-of-plugins.html#limitchunkcountplugin
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),

    // Adds a banner to the top of each generated chunk
    // https://webpack.github.io/docs/list-of-plugins.html#bannerplugin
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },

  devtool: isDebug ? 'cheap-module-source-map' : 'source-map',
};


// export default [clientConfig, serverConfig];


module.exports = {
  context: path.resolve(__dirname, '../src'),
  entry: {
    main: [
      /* 'babel-polyfill', */
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './app-client.js',
    ],
  },
  output: {
    path: path.resolve(__dirname, '../src/static/'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, '../src/components'),
      Pages: path.resolve(__dirname, '../src/pages'),
      Layouts: path.resolve(__dirname, '../src/layouts'),
      Core: path.resolve(__dirname, '../src/core'),
      SVG: path.resolve(__dirname, '../src/assets/svg'),
      Images: path.resolve(__dirname, '../src/assets/images'),
    },
    extensions: ['.js', '.jsx'],
  },
  devtool: 'source-map',
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, '../src'),
        ],
        exclude: [
          path.resolve(__dirname, '../src/static'),
          path.resolve(__dirname, '../src/views'),
          path.resolve(__dirname, '../src/server.js'),
          path.resolve(__dirname, '../src/server.babel.js'),
          path.resolve(__dirname, '../src/server*'),
          path.resolve(__dirname, '../src/main.js'),
        ],
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react'],
        },
      },
      {
        test: /\.scss$/,
        include: [
          path.resolve(__dirname, '../src/assets/scss'),
          path.resolve(__dirname, '../src/pages'),
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
