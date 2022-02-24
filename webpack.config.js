const webpack = require('webpack');
const webpackCommonConfig = require('./webpack.common');


module.exports = {
  entry: webpackCommonConfig.entry,
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
  ],

  output: webpackCommonConfig.output,
};