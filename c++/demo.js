/**
 * node addon hello
 */
const a = require('./build/Release/addon')

console.log(a.hello())
