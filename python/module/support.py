#!/usr/bin/python3
# filename: support.py

if __name__ == '__main__':
  print('程序自身运行')
else:
  print('我来自另一模块')

def print_func( par ):
  print("Hello : ", par)
  return

def fib(n):
  a, b = 0, 1
  while b < n:
    print(b, end=' ')
    a, b = b, a+b
  print()

def fib2(n):
  result = []
  a, b = 0, 1
  while b < n:
    result.append(b)
    a, b = b, a+b
  return result
