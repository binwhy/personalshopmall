//脚手架3中配置路径的别名
//创建一个vue.config.js 必须是这个名字
//到时候会将我们的配置进行合并
//@ 是在默认配置中已经起了一个别名 指向src目录
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets':'@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views'
      }
    }
  }
}
