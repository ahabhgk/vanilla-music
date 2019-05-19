const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')
const OfflinePlugin = require('offline-plugin')
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')

const commonConfig = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: '/node_module/',
        use: 'babel-loader',
      },
      {
        test: /\.(eot|ttf|svg|woff|otf|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: './style/font/',
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              outputPath: './img/',
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          { loader: 'html-withimg-loader' },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new OfflinePlugin(),
    new AppManifestWebpackPlugin({
      logo: './src/image/logo.png',
      persistentCache: false,
      output: '/img/icons-[hash:8]/',
      config: {
        appName: 'vanilla-music',
        appDescription: '原乐是一个功能简单，设计有趣，交互方式独特的极简风格音乐播放器。',
        developerName: 'ahabhgk',
        developerURL: 'ahabhgk.top',
        background: '#fff',
        theme_color: '#fff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
        },
      },
    }),
  ],
}

module.exports = (env) => {
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  }
  return merge(commonConfig, devConfig)
}
