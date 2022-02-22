const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const {
  RunScriptWebpackPlugin
} = require('run-script-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

/**
 * Tips: 此文件仅包含webpack HRM hot reload module热模块更新, 详情查看nest官方文档
 */
module.exports = {
  entry: ['webpack/hot/poll?100', './src/main.ts'],
  target: 'node',
  externals: [
    nodeExternals({
      allowlist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [{
      test: /.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/,
    }, ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new RunScriptWebpackPlugin({
      name: 'main.js'
    }),

    // 
    new CopyPlugin({
      patterns: [{
        from: path.join(__dirname, 'src/public'),
        to: path.join(__dirname, 'dist/public')
      }]
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    clean: true, // 每次清空dist
    library: {
      type: 'commonjs2'
    },
  },
};