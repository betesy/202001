const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
	CleanWebpackPlugin
} = require('clean-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/main.js',
	output: {
		filename: 'bundle.[hash].min.js',
		path: path.resolve(__dirname, 'build')
	},
	// 在WEBPACK中使用插件
	plugins: [
		// 配置指定的HTML页面模板
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeAttributeQuotes: true,
				removeEmptyAttributes: true
			}
		}),
		// 每一次打包都把之前打包的清空
		new CleanWebpackPlugin()
	]
};