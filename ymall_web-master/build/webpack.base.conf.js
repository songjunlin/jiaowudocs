var path = require('path')// node自带的文件路径工具
var utils = require('./utils')// 工具函数集合
var config = require('../config')  // 配置文件
var vueLoaderConfig = require('./vue-loader.conf')  // 工具函数集合
/**
 * 获得绝对路径
 * @method resolve
 * @param  {String} dir 相对于本文件的路径
 * @return {String}     绝对路径
 */
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot, // 编译输出的静态资源根路径
    filename: '[name].js',// 编译输出的文件名
    publicPath: process.env.NODE_ENV === 'production'// 正式发布环境下编译输出的上线路径的根路径
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  externals: {
    Quill: 'Quill',
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],// 自动补全的扩展名
    alias: {// 路径别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'page': resolve('src/page'),
      'components': resolve('src/components'),
      'assets': resolve('src/assets'),
      'utils': resolve('src/utils'),
      'router': resolve('src/router'),
      'service': resolve('src/service'),
      'store': resolve('src/store'),
      'config':resolve('src/config'),
      'static':resolve('./static'),
    }
  },
  module: {
    rules: [ // 审查 js 和 vue 文件
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader',
      },
    ]
  }
}
