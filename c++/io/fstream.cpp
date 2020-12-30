#include <iostream>
#include <fstream>

using namespace std;

// 模式标志   描述
// ios::app  追加模式，所有写入都追加到文件末尾
// ios::ate  文件打开后定位到文件末尾
// ios::in   打开文件用户读取
// ios::out  打开文件用于写入
// ios::trunc 如果文件存在，其内容将在文件打开之前被截断，即把文件长度设为0

int main()
{
  char data[100];
  ofstream outfile;
  // 以写模式打开文件
  outfile.open("afile.dat");

  cout << "Write to output file: " << endl;
  cout << "Write your name: " << endl;
  cin.getline(data, 100);
  outfile << data;

  cout << "Write your age: " << endl;
  cin >> data;
  // cin.ignore();
  outfile << data;
  // 关闭文件流
  outfile.close();

  // 以读模式打开文件
  ifstream infile;
  infile.open("afile.dat");

  // 从文件读取内容
  infile >> data;
  // 显示内容到屏幕
  cout << data;
  // 再次从文件读取内容
  infile >> data;
  cout << data;
  // 关闭打开的文件
  infile.close();

  return 0;
}
