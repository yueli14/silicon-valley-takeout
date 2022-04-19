module.exports = {
  publicPath:'./',
  lintOnSave: false, //加入此行 , false为关闭true为开启
  //配置代理
  // proxy: {
  //   '/toserver': { // 匹配所有以 '/api'开头的请求路径
  //     target: 'http://localhost:4000', // 代理目标的基础路径
  //     changeOrigin: true, // 支持跨域
  //     pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
  //       '^/toserver': ''
  //     }
  //   }
  // }
  devServer:{
    proxy:{
      '/toserver': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:4000', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: {// 重写路径: 去掉路径中开头的'/api'
          '^/toserver': ''
        }
      }
    }
  },

}