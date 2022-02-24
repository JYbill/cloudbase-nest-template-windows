const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
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