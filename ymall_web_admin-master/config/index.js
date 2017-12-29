// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {// production 生产环境
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),// 构建输出的index.html文件
    assetsRoot: path.resolve(__dirname, '../dist'),// 构建输出的静态资源路径
    assetsSubDirectory: 'static',// 构建输出的二级目录
    assetsPublicPath: '/',// 构建发布的根目录，可配置为资源服务器域名或 CDN 域名
    productionSourceMap: true,// 是否开启 cssSourceMap
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 运行“build”命令行时，加上一个参数，可以在构建完成后参看包分析报告
    // true为开启，false为关闭
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // dev 开发环境
  dev: {
    env: require('./dev.env'),// 构建环境
    port: 8087,// 端口号
    autoOpenBrowser: true,// 是否自动打开浏览器
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',// 编译发布的根目录，可配置为资源服务器域名或 CDN 域名
    proxyTable: {
      '/api':{
        target: 'http://zc.laoyaoguai.com.cn/api/',
        changeOrigin:true,
        secure:false,
        pathRewrite:{
            '^/api':'',

        }
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // 默认情况下，关闭 CSS Sourcemaps，因为使用相对路径会报错。
    cssSourceMap: false
  }
}



