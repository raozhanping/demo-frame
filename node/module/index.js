require('./pkg')
const {log} = require('../common.js')

log('模块路径', module.paths)
log('获取文件拓展处理函数', require.extensions)
