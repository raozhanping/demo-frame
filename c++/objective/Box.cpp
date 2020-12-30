#include <iostream>
using namespace std;

class Box
{
  public:
    double length;
    double breadth;
    double height;
    // 成员函数声明
    double get(void);
    void set(double len, double bre, double hei);
};
// 成员函数定义
double Box::get(void)
{
  return length * breadth * height;
}
void Box::set(double len, double bre, double hei)
{
  length = len;
  breadth = bre;
  height = hei;
}

double calcVolume(Box *box)
{
  Box a = *box;
  cout << "length: " << a.length << endl;
  cout << "breadth: " << a.breadth << endl;
  cout << "height: " << a.height << endl;
  return a.length * a.breadth * a.height;
}
double calcVolumeWithRef(Box& box)
{
  return box.length * box.breadth * box.height;
}

int main()
{
  Box Box1;
  Box Box2;
  Box Box3;
  double volume = 0.0;

  // Box1 详述
  Box1.length = 5.0;
  Box1.breadth = 6.0;
  Box1.height = 7.0;
  // Box2 详述
  Box2.length = 10.0;
  Box2.breadth = 11.0;
  Box2.height = 12.0;

  volume = calcVolume(&Box1);
  cout << "=== Box1 的体积：" << volume << endl;
  volume = calcVolumeWithRef(Box2);
  cout << "=== Box2 的体积：" << volume << endl;
  Box3.set(20.0, 30.0, 40.0);
  volume = calcVolume(&Box3);
  cout << "=== Box3 的体积：" << volume << endl;
  return 0;
}
