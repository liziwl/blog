---
title: C++语言笔记-1
date: 2017-08-07 19:37:43
categories:
- 编程笔记
---

使用书籍: [A Tour of C++](https://book.douban.com/subject/25720141/)
作者: Bjarne Stroustrup (C++之父)
# Chapter 1
<!-- more -->

1. namespace
```cpp
using namespace std;
```
This way can make `std` visible in the current action scope. Otherwise, we need to use prefix like `std::`, which explicitly state the namespace.
2. C++ can handle override function, but if there exists ambiguity in compiling the code, the compiler will throw an error. Such like:
```cpp
int func(double d1,int i1){}
int func(int i2,double d2){}
int result = func(2,3);
```
3. C++ sometime will do implicit conversion. Such like
`int a = 7.2`, actually, `7` will be store in `a`.
4. C++ allow the declaration in the form
`type name {parameter p1...};`  which seems like constructor. There is no equal between name and brace.


##  中英名词对照
|     英文     |   中文   |
| ------------ | -------- |
| namespace    | 命名空间 |
| action scope | 作用域   |
| brace        | 花括号   |
