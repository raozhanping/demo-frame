// C++的io发生在流中
// 输入操作：字节流从设备流向内存
// 输出操作: 字节流从内存流向设备
#include <iostream>
using namespace std;

int main()
{
  char count[2];
  cout << "请输入数字" << endl;
  cin >> count;
  cout << "您输入的数字为：" << count << endl;
  return 0;
}
