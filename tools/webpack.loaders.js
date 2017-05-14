
module.exports = [
    {
        test: /\.(js|jsx)$/,
        include: [
           '/src',
        ],
        exclude: [
           '/src/static',
           '/src/views',
           '/src/server.js',
           '/src/server.babel.js',
           '/src/server*',
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
    {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url?limit=10000&mimetype=image/svg+xml',
    },
    {
        test: /\.gif/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=10000&mimetype=image/gif',
    },
    {
        test: /\.jpg/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=10000&mimetype=image/jpg',
    },
    {
        test: /\.png/,
        exclude: /(node_modules|bower_components)/,
        loader: 'url-loader?limit=10000&mimetype=image/png',
    },
];
