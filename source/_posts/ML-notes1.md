---
title: ML笔记-1
date: 2017-08-29 13:10:13
categories:
- 机器学习
mathjax: true
---
# Week 2
## Normal Equation
知乎专栏：[掰开揉碎推导Normal Equation](https://zhuanlan.zhihu.com/p/22757336)，讲解了Normal Equation如何求最优解，而且还处理了存在线性相关向量的情况。

<!-- more -->
什么时候$X^TX$不可逆？
1. Redundant features, where two features are very closely related (i.e. they are linearly dependent).
2. Too many features (e.g. $m \leq n$). In this case, delete some features or use "regularization" (to be explained in a later lesson).

## 伪逆矩阵 [Pseudo-inverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_pseudoinverse)
对于矩阵$A$，如果存在一个矩阵$B$，使得$A B = B A = I$，其中$I$为与$A$, $B$同维数的单位阵，就称$A$为可逆矩阵（或者称$A$可逆），并称$B$是$A$的逆矩阵。矩阵$A$可逆的充分必要条件是$det A \neq 0$，左式隐含条件是$A$为方阵。

若矩阵为奇异矩阵或非方阵，则不存在逆矩阵，但可以用函数pinv(A)求其伪逆矩阵。基本语法为`X = pinv(A)`或者`X = pinv(A,tol)`,其中tol为误差 max(size(A))\*eps(norm(A))。函数返回一个与$A$的转置矩阵$A^T$同型的矩阵$X$，并且满足：$A X A = A$, $X A X = X$. 此时，称矩阵$X$为矩阵$A$的伪逆，也称为广义逆矩阵。pinv(A)具有inv(A)的部分特性，但不与inv(A)完全等同。

若$A$的逆存在，pinv(A) = inv(A)，不过使用`pinv(A)`却会耗费时间更多。

## Appendix:
Definition in [*Linear Algebra Done Right*](http://www.springer.com/us/book/9783319110790)

### Adjoints
> 7.2 **Definition** *adjoint,* $T^\*$
>
> Suppose $T \in \mathcal{L} (V, W)$. The ***adjoint*** of $T$ is the function $T^\*$: $W \to V$ such that $$\langle Tv, w\rangle = \langle v, T^\*w\rangle$$
>for every $v \in V$ and every $w \in W$.

### Normal
> 7.18 **Definition** *normal*
> * An operator on an inner product space is called ***normal*** if it commutes with its adjoint.
> * In other words, $T \in \mathcal{L} (V)$ is normal if $$T T^\* = T^\* T$$
