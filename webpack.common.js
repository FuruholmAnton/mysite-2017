var path = require('path');

module.exports = {
	resolve: {
		alias: {
			Components: path.resolve(__dirname, './src/components/components'),
			Routes: path.resolve(__dirname, './src/routes/routes.js'),
			Core: path.resolve(__dirname, './src/core'),
			CSS: path.resolve(__dirname, './styles'),
			// SVG: path.resolve(__dirname, './src/svg'),
		},
		extensions: ['.js', '.jsx']
	},
};
