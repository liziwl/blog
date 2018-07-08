---
title: C语言笔记-pipe的使用
date: 2017-08-05 10:37:43
categories:
- 编程笔记
---
C语言做的每个程序都有一个独立的功能，我们可以将多个程序使用管道连接到一起。原理是将前一个的stdout --> 后一个的stdin，形成管道传输。

<!--more-->

我们现在写一个程序``avg.c``，求任意个数的平均值：
``` c
#include <stdio.h>
int main() {
    int s, n;
    scanf("%d,%d", &s, &n);
    float v = s / n;
    printf("v = %f\n", v);
    return 0;
}
```
进行编译后我们得到``avg``，
``` bash
$ ./avg
3000,3
v = 1000.000000
```
看到程序可以正常求平均值，

我们再写一个统计输入的程序``acc.c``：
``` c
#include <stdio.h>
int main() {
    int flag = 1;
    int i;
    int count = 0;
    int s = 0;
    while(flag){
        scanf("%d", &i);
        if(0==i)
            break;
        count++;
        s+=i;
    }
    printf("%d,%d\n",s,count);
    return 0;
}
```
进行编译后我们得到``acc``，

``` bash
$ ./acc
3000
2000
0
5000,2
```
输出数据总数``5000``和数据个数``2``。

我们不妨使用以上两个程序结合起来，将所有数据进行统计``acc``，之后通过管道经过``avg``计算平均值，命令可以写为
``` bash
$ ./input |  ./output
```
针对这个例子这里写成
``` bash
$ ./acc | ./avg
1000
2000
3000
6700
12000
0
v = 4940.000000
```
输入完成我们便得到了对应的平均数。
以上就是通过管道，将两个小程序连接起来得到更复杂的程序的过程。
