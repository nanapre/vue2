const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //上面都是自带的，下面是要写的



  configureWebpack: {

    devServer: {
      proxy: {
        '/api': {
          target: 'http://159.75.169.224:6300/',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }


  }
})
