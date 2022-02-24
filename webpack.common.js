const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: ['./src/main.ts'],
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
    }],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{
          from: path.join(__dirname, 'src/public'),
          to: path.join(__dirname, 'dist/public')
        },
        {
          from: path.join(__dirname, 'src/application.yml'),
          to: path.join(__dirname, 'dist/application.yml'),
        }
      ]
    }),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    clean: true, // 每次清空dist
    library: { // 导出类型
      type: 'commonjs2'
    },
  },
}