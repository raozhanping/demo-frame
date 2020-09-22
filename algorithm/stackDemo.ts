import Stack from './Stack'
import StackObject from './StackObject'

const decimalToBinaryStack = function (decNumber) {
  let number = decNumber
  let rem
  let binaryString = ''
  const stack = new StackObject()
  while (number > 0) {
    rem = Math.floor(number % 2)
    stack.push(rem)
    number = Math.floor(number / 2)
  }
  while (!stack.isEmpty()) {
    binaryString += stack.pop().toString()
  }
  return binaryString
}
console.time('start')
decimalToBinaryStack(100000000000000000)
console.timeEnd('start')

