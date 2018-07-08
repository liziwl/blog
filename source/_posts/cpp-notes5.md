---
title: C++语言笔记-5
date: 2017-08-22 13:10:13
categories:
- 编程笔记
---
# Chapter 4
1. `struct`成员属性的访问方式：
一种是通过名字或引用，另一种是通过指针。
```c
void func(Vector c, Vector& rv, Vector* pv) {
    int i1 = v.sz;
    int i2 = rv.sz;
    int i4 = pv->sz;
}
```

2. 声明函数时，显式告知编译器将进行重写函数(override)
```c
type func_name(type parameters) override;
```
编译器会检查父类是否存在该函数。

3. 可重写构造函数或者运算符实现“移动”功能，减少多次声明临时变量造成的内存使用。
