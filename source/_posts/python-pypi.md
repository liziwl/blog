---
title: Python 精简依赖 -- pip-chill
date: 2019-10-11 16:43:24
categories:
- 编程笔记
---

开发时直接 `pip freeze` 得到的依赖文件表太乱了，就想有没有包能实现分析依赖让依赖文件表可读性更好。查阅后发现还真有这样的包 --pip-chill (https://pypi.org/project/pip-chill/)。

<!-- more -->

# 最简单的依赖管理

```bash
# 安装虚拟环境
pip install virtualenv
virtualenv --no-site-packages venv

pip freeze > requirements.txt # 输出本地包环境至文件
pip install -r requirements.txt #安装本地依赖
```

# 精简依赖管理

pip-chill (https://pypi.org/project/pip-chill/)

```bash
source venv/bin/activate # 激活环境
pip-chill # with version
pip-chill --no-version # no version
pip-chill -v # list package dependencies too and version
```
