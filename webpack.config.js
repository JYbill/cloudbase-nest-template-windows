const webpackCommonConfig = require('./webpack.common');

module.exports = {
  plugins: [
    ...webpackCommonConfig.plugins
  ],
  output: webpackCommonConfig.output
};