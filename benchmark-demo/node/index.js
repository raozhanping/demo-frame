const Benchmark = require('benchmark')
const microtime = require('microtime')
const case0 = require('../case0')

console.log(microtime)
console.log(Date.now() === new Date().getTime(), new Date().getTime())
console.log(microtime.now(), microtime.nowDouble(), microtime.nowStruct())

case0(Benchmark)
