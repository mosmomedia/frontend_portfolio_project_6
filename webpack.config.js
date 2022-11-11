const webpack = require('webpack');
const path = require('path');
const dotenv = require('dotenv');

const nodeExternals = require('webpack-node-externals');

// Node.js - os 모듈 불러오기
const os = require('os');

// plugins
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
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
			proxy: {
				'/api': 'http://localhost:8000',
			},
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

		optimization: {
			// 압축
			minimize: true,
			// 미니마이저
			minimizer: [
				// 플러그인 인스턴스 생성
				new CssMinimizerPlugin({
					// CPU 멀티 프로세서 병렬화 옵션 (기본 값: true)
					parallel: os.cpus().length - 1,
				}),
			],
		},
		performance: {
			hints: false,
		},
	};
};

const backConfig = (env) => {
	const { DEV } = env;
	if (DEV) {
		dotenv.config({ path: './dev.env' });
	} else {
		dotenv.config({ path: './.env' });
	}

	return {
		mode: DEV ? 'development' : 'production',
		target: 'node',
		externals: [nodeExternals()],
		entry: './backend/server.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'bundle-back.js',
		},

		resolve: {
			extensions: ['.js'],
		},
		module: {
			rules: [
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
		optimization: {
			minimize: true,
		},
	};
};

module.exports = [frontConfig, backConfig];
