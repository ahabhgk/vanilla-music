/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const Webpack = require('webpack')

module.exports = {
  mode: 'development',
  output: {
    filename: './js/[name].js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // 配置开发服务运行时的文件根目录
    port: 3000, // 端口
    hot: true, // 是否启用热更新
    open: false, // 是否自动打开浏览器
    proxy: { // 配置代理
      '/api': 'http://localhost:8000',
    },
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
  ],
}
