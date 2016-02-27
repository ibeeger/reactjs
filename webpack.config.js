/* 
 * @Author: willclass
 * @Date:   2016-02-17 15:35:45
 * @Last Modified by:   willclass
 * @Last Modified time: 2016-02-27 10:47:38
 */

'use strict';

var webpack = require('webpack');

module.exports = {
	entry: './modules/app.js',
	output: {
		filename: 'main.js'
	},
	module: {
		loaders: [
		// {
		// 	test: /\.css$/,
		// 	loader: 'style-loader!css-loader'
		// }, 
		{
			test: /\.js[x]?$/,
			exclude: /node_modules/,
			loader: 'babel-loader?presets[]=es2015&presets[]=react'
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true
		})
	]
};