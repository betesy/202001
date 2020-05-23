const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 配置多页面模板
const htmlPlugins = ['index', 'login'].map(item => {
	return new HtmlWebpackPlugin({
		template: `./public/${item}.html`,
		filename: `${item}.html`,
		chunks: [item],
		minify: {
			collapseWhitespace: true,
			removeComments: true,
			removeAttributeQuotes: true,
			removeEmptyAttributes: true
		}
	});
});

module.exports = {
	mode: 'production',
	entry: {
		index: './src/main.js',
		login: './src/login.js',
	},
	output: {
		filename: '[name].[hash].min.js',
		path: path.resolve(__dirname, 'build')
	},
	devServer: {
		port: '3000',
		compress: true,
		open: true,
		hot: true
	},
	// 配置WEBPACK的插件
	plugins: [
		...htmlPlugins,
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[hash].min.css'
		})
	],
	// 配置WEBPACK的加载器LOADER
	module: {
		rules: [{
			test: /\.(css|less)$/i,
			use: [
				MiniCssExtractPlugin.loader,
				"css-loader",
				"postcss-loader",
				"less-loader"
			]
		}]
	}
};