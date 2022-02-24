const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const {
  RunScriptWebpackPlugin
} = require('run-script-webpack-plugin');
const webpackCommonConfig = require('./webpack.common');
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

/**
 * Tips: 此文件仅包含webpack HRM hot reload module热模块更新, 详情查看nest官方文档
 */
module.exports = {
  entry: [...webpackCommonConfig.entry, 'webpack/hot/poll?100'],
  target: webpackCommonConfig.target,
  externals: webpackCommonConfig.externals,
  module: {
    rules: [...webpackCommonConfig.module.rules],
  },
  mode: 'development',
  resolve: {
    extensions: [...webpackCommonConfig.resolve.extensions],
  },
  plugins: [
    // 公共插件
    ...webpackCommonConfig.plugins,

    new webpack.HotModuleReplacementPlugin(),

    new RunScriptWebpackPlugin({
      name: 'main.js'
    }),
  ],

  output: webpackCommonConfig.output,
};