---
title: 正则表达式中的括号用法
date: 2017-10-08 11:05:29
categories:
- 编程笔记
---

# 正则表达式的() [] {}的意思。
* `()` 是为了提取匹配的字符串。表达式中有几个()就有几个相应的匹配字符串。
* `(\s*)` 表示连续空格的字符串。
* `[]` 是定义匹配的字符范围。比如 `[a-zA-Z0-9]` 表示相应位置的字符要匹配英文字符和数字。`[\s*]` 表示空格或者`*` 号。
* `{}` 一般用来表示匹配的长度，比如`\s{3}` 表示匹配三个空格，`\s[1,3]`表示匹配一到三个空格。
* `(0-9)` 匹配 `'0-9'` 本身。 `[0-9]*` 匹配数字（注意后面有* ，可以为空）`[0-9]+` 匹配数字（注意后面有 +，不可以为空）`{1-9}` 写法错误。
* `[0-9]{0,9}` 表示长度为 0 到 9 的数字字符串。

<!-- more -->

## 正则表达式小括号的多义性

小括号在正则表达式这有以下意义

* 限定量词作用的范围
* 限定多选结构的范围
* 为反向引用捕获文本
* 分组捕获
* 只分组不捕获
* 前瞻

### 限定量词作用的范围

```js
var reg1 = /(Matz)?/; // 0或1个Matz
var reg2 = /(Matz)+/; // 1个以上Matz
var reg3 = /(Matz)*/; // 0或多个Matz
```

### 限定多选结构的范围

```js
var reg = /(Matz|Eich)/
reg.test('Matz') // => true
reg.test('Eich') // => true
reg.test('John') // => false
```

### 为反向引用捕获文本

```js
var reg = /(boy)\1/ // 相当于 /boyboy/
reg.test('boy') // => false
reg.test('boyboy') // => true
 
var reg /(boy)(girl)\1\2/
reg.test('boygirlboygirl') // => true
```

### 分组捕获

```js
var reg1 = /(\d{3}) (\d{3})/
var str = '111 222'
str.replace(reg1, '$2 $1') // => '222 111' , 注意这里的$2,$1，存放了匹配的字符串
 
var reg2 = /(\d{3})(\d{4})(\d{4})/
var mobile = '13522722724'
reg2.test(mobile)
RegExp.$1 // => 135
RegExp.$2 // => 2272
RegExp.$3 // => 2724
 
var reg3 = /(\d{3})(\d{4})(\d{4})/
var mobile = '13522722724'
mobile.replace(reg3, '$1 $2 $3') // => '135 2272 2724'
```

### 只分组不捕获(和 "?:" 一起)

```js
var reg = /(?:\d+)/
reg.test('13522722724')
RegExp.$1 // => '' 不存储匹配的元素
```
较长的正则表达式中，反向引用会降低匹配速度，性能降低，不需要反向引用时应使用分组不捕获。

### 前瞻（lookahead，和 "?=" 一起）

它告诉正则表达式向前看一些字符但不移动位置，前瞻不匹配任何字符只匹配文本中的特定位置。

```js
var reg = /(John) (?=Resig)/
reg.test('John') // => false
reg.test('John Backus') // => false
reg.test('John Reisg') // => true
RegExp.$1 // => 'John'，注意这里不是 "John Resig"
```
如下是一个利用前瞻实现手机号格式化的小函数

```js
/*
 * 手机号分隔
 * 13522722724 -> 135 2272 2724
 */
function separateMobile(num) {
    var arr = ( '0' + num ).replace(/(\d{4})(?=\d)/g,"$1 ").split('')
    arr.shift()
    return arr.join('')
}
```
　　