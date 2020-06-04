// module.exports 脚手架3可以直接使用@来代替
module.exports = {
  configureWebpack: {
    resolve: {
      // 这里是配置别名
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
