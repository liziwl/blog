---
title: C++语言笔记-2
date: 2017-08-09 19:37:43
categories:
- 编程笔记
---

使用书籍: [A Tour of C++](https://book.douban.com/subject/25720141/)
作者: Bjarne Stroustrup (C++之父)
# Chapter 4

1. C++传值的方式传实参，即是`type function_name(type parameter);`实际上是把一份副本传递给函数，因此我们修改形参（副本）不会影响主调函数的实参，并且可以将结果作为返回值使用。

    如果不想使用拷贝，想直接使用源数据`type function_name(type& parameter);`，如果不改变源数据，还可再加上``const``前缀。

```cpp
T a[n];     //T[n]: n个T组成的数组
T* p;       //T*: 指向T的指针
T& r;       //T&: T的引用
T func(A);  //T(A): 是个返回T类型的函数，接受A类型的实参。
```
2. ``switch-case``只能判断常量(`short`, `int`, `long`, `char`)。
3. C++存在对象`new()`方法，但是没有自动的内存清理机制，需要手动定义清理方法``~class_name(){}``实现``delete()``功能

<!-- more -->
4.
* 值传递：

    形参是实参的拷贝，改变形参的值并不会影响外部实参的值。从被调用函数的角度来说，值传递是单向的（实参->形参），参数的值只能传入,不能传出。当函数内部需要修改参数，并且不希望这个改变影响调用者时，采用值传递。

    下面这里例子，证明给入参数是个栈中拷贝，且自动销毁。
```cpp
#include <iostream>
using namespace std;
class ObjectType {
private:
    string _name;
public:
    ObjectType(string name) {
        _name = name;
        cout << "Creating object " << _name << endl;
    }
    ObjectType() {
        _name = "unnamed";
        cout << "Creating object " << _name << endl;
    }
    ~ObjectType() {
        cout << "Destroying object " << _name << endl;
    }
};
void func(ObjectType x) {
    ObjectType y;
    cout << "in func()" << endl;
}

int main() {
    ObjectType o1;
    ObjectType *o2p = new ObjectType("o2");
    cout << "in main()" << endl;
    func(o1);
    return 0;
}
```
```bash
Creating object unnamed
Creating object o2
in main()
Creating object unnamed
in func()
Destroying object unnamed
Destroying object unnamed
Destroying object unnamed
```
还有其他2种调用方式：

* 指针传递：

    形参为指向实参地址的指针，当对形参的指向操作时，就相当于对实参本身进行的操作。

* 引用传递：

    形参相当于是实参的“别名”，对形参的操作其实就是对实参的操作，在引用传递过程中，被调函数的形式参数虽然也作为局部变量在栈中开辟了内存空间，但是这时存放的是由主调函数放进来的实参变量的地址。被调函数对形参的任何操作都被处理成间接寻址，即通过栈中存放的地址访问主调函数中的实参变量。正因为如此，被调函数对形参做的任何操作都影响了主调函数中的实参变量。

### Reference：
* [C++ 值传递、指针传递、引用传递详解](http://www.cnblogs.com/yanlingyin/archive/2011/12/07/2278961.html)
* [C++中引用传递与指针传递区别（进一步整理）](http://xinklabi.iteye.com/blog/653643)
