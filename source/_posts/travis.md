---
title: Travis CI 构建 Hexo 自动部署
date: 2018-07-09 13:10:58
categories: 
- hexo
---

# Travis CI
CI是 Continuous Integration 的缩写，持续集成之意。

> 持续集成是一种软件开发实践，每次集成都通过自动化的构建（包括编译，发布，自动化测试）来验证，从而尽早地发现集成错误。

![CI](/images/Continuous.png)

# 具体配置
## Hexo 搭建

这里使用`Hexo`+`Next`+`GitHub Pages`组合示范过程，具体过程不再赘述。网站源码放到src分支，博客的静态文件部署到master分支。

<!-- more -->

## 设置 Travis CI
登陆 [Travis CI](https://travis-ci.com/)，使用 GitHub 账户登录，它会自动关联 GitHub 上的仓库。点击右上角用户查看 GitHub 仓库，并选择要启动的项目，这里选择`yourname/yourname.github.io`。

点击设置按钮，进入设置选项，如下图开启相关服务。

![CI1](/images/ci1.png)

## 配置 Acess Token

![CI2](/images/ci2.png)

创建新的[Github token](https://github.com/settings/tokens)，勾选必要权限，起名随意，可叫（Travis-CI token）。必要权限如下。

![CI3](/images/ci3.png)

复制生成的 token 并在 Travis CI 页面中配置Environment Variables。环境变量名称 `GH_TOKEN`，一定设置Log为不可见（private，有一把小锁显示），否则有安全隐患。

## 配置 `.travis.yml`

`.travis.yml` 放在仓库根目录下。

特别注意的是，由于主题配置文件`_config.yml`会有敏感信息，所以将其作为私有的子模块处理，clone 需要使用 Github token。

```yaml
language: node_js   # 设置语言
node_js: stable     # 设置相应的版本

git:
  submodules:
    false

# cache:
#     directories:
#         - node_modules    # 据说可以减少Travis构建时间

before_install:
  - export TZ='Asia/Shanghai'   # 更改时区
  - node --version
  - npm --version
  - npm install hexo-cli -g # 安装hexo插件
  # - npm install gulp -g     # 安装静态页面压缩插件

install:
  - npm install   # 安装hexo插件

before_script:
  - git clone --quiet "https://${GH_TOKEN}@${GH_THEME}" themes/next

script:
  - hexo clean   # 清除
  - hexo g   # 生成
  # - gulp

after_script:
  - git clone https://${GH_REF} .deploy_git  # GH_REF是最下面配置的仓库地址
  - cd .deploy_git
  - git checkout master
  - cd ../
  - mv .deploy_git/.git/ ./public/   # 这一步之前的操作是为了保留master分支的提交记录，不然每次git init的话只有1条commit
  - cd ./public
  - git config user.name "liziwl"  # 修改name
  - git config user.email "leezisy@gmail.com"  # 修改email
  - git add .
  - git commit -m "Travis-CI Auto Builder at `date +"%Y-%m-%d %H:%M"`"  # 提交记录包含时间 跟上面更改时区配合
  - git push --quiet "https://${GH_TOKEN}@${GH_REF}" master:master  # GH_TOKEN是在Travis中配置环境变量的名称

branches:
  only:
    - src  # 只监测这个分支，一有动静就开始构建

env:
    global:
        - GH_REF: github.com/liziwl/liziwl.github.io.git    # hexo 仓库地址
        - GH_THEME: github.com/liziwl/hexo-theme-next-mod.git   # hexo 主题地址
```

## Push 到 GitHub

在`_posts`目录下新建文章并 `push` 分支，登陆 `Travis CI` 即可发现已经检测到分支变化并开始构建，其中`Job log`记录了构建的过程。

## 坑

目前不清楚原因，Travis 中使用 `gulp` 压缩结果和本地不一样，导致 font-awesome 路径出错，干脆停用了，压缩效果其实一般般，如果不压缩图片的话，只能降低最多5%的空间。
