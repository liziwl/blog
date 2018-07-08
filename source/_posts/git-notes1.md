---
title: git-代码冲突常见解决方法
date: 2017-10-01 22:57:39
categories:
- git
---
如果系统中有一些配置文件在服务器上做了配置修改，然后后续开发又新添加一些配置项的时候,
在发布这个配置文件的时候，会发生代码冲突：

<!-- more -->

```git
error: Your local changes to the following files would be overwritten by merge:
        protected/config/main.php
Please, commit your changes or stash them before you can merge.
```

如果希望保留生产服务器上所做的改动，仅仅并入新配置项，处理方法如下:
```bash
git stash
git pull
git stash pop
```
然后可以使用`git diff -w [文件名]` 来确认代码自动合并的情况。

解决文件中冲突的的部分：
```bash
<<<<<<< Updated upstream
Code block A
=======
Code block B
>>>>>>> Stashed changes
```
其中`Updated upstream`和`=======`之间的内容就是pull下来的内容，`=======`和`Stashed changes`之间的内容就是本地修改的内容。碰到这种情况，git也不知道哪行内容是需要的，所以要自行确定需要的内容。

解决完成之后，就可以正常的提交了。

反过来，如果希望用代码库中的文件完全覆盖本地工作版本。方法如下:
```bash
git reset --hard
git pull
```
其中git reset是针对版本,如果想针对文件回退本地修改,使用
```bash
git checkout HEAD file/to/restore
```
