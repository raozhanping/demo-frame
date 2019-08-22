// 按位操作符
let global = this || window
global.log = (...args) => {
  console.log.apply(null, args)
}

(function() {
// ------------ 按位非(~) -------------
// 整数
let num = 171
this.log('num: ', num)
this.log('binary: ', Number(num).toString(2))
this.log('~ num =>', ~num); // -171

this.log('\nconclusion: ', '~num => -(num + 1)', '\n')

// 有符号整数
/**
 * 有符号整数
 * - 最有意义(最左边)的位称为符号位，正整数的符号位总是0，负整数的符号位总是1
 * - 除符号位之外的其余31位用于表示整数。因此，可以表示的最大32位整数是（2^32-1），它是2147483647，而最小整数是（2^31），它是-2147483648
 * - 对于不在32位有符号整数范围内的整数，最有效位将被丢弃，直到整数在该范围内
 */
this.log(Math.pow(2, 31) -1)
// 应用
/**
 * - Array.indexOf()
 * - Array.lastIndexOf()
 * - Array.findIndex()
 * - String.indexOf()
 * - String.lastIndexOf()
 * - String.search()
 */
this.log('~-1 =>', ~-1, ' => Boolean(~-1) =>', Boolean(~-1))

// ------------ 按位与(&) -------------

// 应用
// 奇数或偶数
// ------------ 按位或(|) -------------
// ------------ 按位异或(^) -------------
// ------------ 按位与(&) -------------
// ------------ 按位与(&) -------------


}).call(global)
