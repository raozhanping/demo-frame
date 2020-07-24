const webpack = require('webpack')

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [new webpack.DefinePlugin({
      'process.env.HOST': process.env.NODE_ENV === 'production' ? `'https://mp.360.cn'` : `''`
    })]
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        return {
          ...options,
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: ['xlink:href', 'href'],
            use: ['xlink:href', 'href'],
            div: 'poster'
          }
        }
      })
      .end()
      .end()
  },
  devServer: {
    proxy: {
      '/data': {
        target: 'https://mp.360.cn'
      }
    }
  }
}
