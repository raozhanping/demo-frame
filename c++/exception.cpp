#include <iostream>
#include <exception>
using namespace std;

struct MyException : public exception
{
  // FIXME: 这条语句看不懂 大概意思是定义what方法
  const char * what() const throw()
  {
    return "C++ Exception.";
  }
};

int main()
{
  try
  {
    throw MyException();
  }
  catch(MyException& e)
  {
    std::cout << "Exception caught:" << std::endl;
    std::cout << e.what() << std::endl;
  }
  catch(std::exception& e)
  {
    // 其他错误
  }
  return 0;
}
