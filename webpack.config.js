const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

const frontConfig = (env) => {
	const { DEV } = env;
	if (DEV) {
		dotenv.config({ path: './dev.env' });
	} else {
		dotenv.config({ path: './.env' });
	}

	console.log(process.env.NODE_ENV);

	return {
		mode: DEV ? 'development' : 'production',
		target: 'web',
		devServer: {
			static: path.join(__dirname, './frontend/public'),
			// proxy: {
			// 	'/': 'http://localhost:8000',
			// },
			port: 8080,
			historyApiFallback: true,
		},
		entry: './frontend/src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle-front.js',
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify(process.env.NODE_ENV),
					PORT: JSON.stringify(process.env.PORT),
					isDEV: DEV,
				},
			}),
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, './frontend/public', 'index.html'),
				minify:
					process.env.NODE_ENV === 'production'
						? {
								collapseWhitespace: true, // 빈칸 제거
								removeComments: true, // 주석 제거
						  }
						: false,
			}),
		],
		module: {
			rules: [
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader'],
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
			],
		},

		devtool: 'inline-source-map',
		performance: {
			hints: false,
		},
	};
};

module.exports = [frontConfig];
