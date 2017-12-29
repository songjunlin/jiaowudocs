var utils = require('./utils')// 工具函数集合
var webpack = require('webpack')
var config = require('../config')  // 配置文件
var merge = require('webpack-merge')  // webpack 配置合并插件
var baseWebpackConfig = require('./webpack.base.conf')  // webpac基本配置
var HtmlWebpackPlugin = require('html-webpack-plugin')  // 自动生成 html 并且注入到 .html 文件中的插件
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')  // webpack错误信息提示插件

// 将 Hot-reload 热重载的客户端代码添加到 webpack.base.conf 的 对应 entry 中，一起打包
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({// definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
      'process.env': config.dev.env
    }),
    // HotModule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个 html 文件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 将 index.html 作为入口，注入 html 代码后生成 index.html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()// webpack错误信息提示插件
  ]
})
