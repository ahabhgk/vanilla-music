const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const AppManifestWebpackPlugin = require('app-manifest-webpack-plugin')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

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
    new OfflinePlugin({
      responseStrategy: 'cache-first', // 缓存优先
      AppCache: false, // 不启用appCache
      safeToUseOptionalCaches: true, // Removes warning for about `additional` section usage
      autoUpdate: true, // 自动更新
      caches: { // webpack打包后需要换的文件正则匹配
        main: [
          '**/*.js',
          '**/*.css',
          /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        ],
        additional: [
          ':externals:',
        ],
      },
      excludes: ['**/.*', '**/*.map', '**/*.gz'], // 需要过滤的文件
      ServiceWorker: {
        output: './sw.js', // 输出目录
        publicPath: '/sw.js', // sw.js 加载路径
        scope: '/vanilla-music/', // 作用域（此处有坑）
        minify: true, // 开启压缩
        events: true, // 当sw状态改变时候发射对应事件
      },
    }),
    new AppManifestWebpackPlugin({
      logo: './src/image/logo.png',
      persistentCache: false,
      prefix: '/vanilla-music/',
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
        start_url: 'https://ahabhgk.top/vanilla-music/',
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
