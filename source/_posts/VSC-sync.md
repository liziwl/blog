---
title: Visual Studio Code 插件 -- Settings Sync
date: 2018-07-08 20:14:04
categories: 
- 计算机拾遗
---

# 概要
* 官方教程：

    http://shanalikhan.github.io/2015/12/15/Visual-Studio-Code-Sync-Settings.html

* 插件地址：

    https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync

## 设置方式
1. 在A机器上安装了Settings Sync，并做好了自己常用的插件和设置部署.
2. 在github上创建能修改gist的token，保存下载，之后要用。token只有第一次有显示。
3. 在A机器上，按下快捷键 `Shift+Alt+U` （上传设置），输入token，将配置上传到gist。成功上传会返回`gist-id`，如忘记复制也可直接上  https://gist.github.com/ 查看标题为 `cloudSettings` gist-id。
4. B机器安装好 Visual Studio Code 后，首先安装Settings Sync, 并通过快捷键 `Shift+Alt+D` （下载设置），第一步提示输入 token，第二步输入`gist-id`，完成无误后，自动下载你之前在A上面上传的配置，并进行同步，最后重启Visual Studio Code生效。
5. 两台机器如果要保持一致,可以在Settings Sync开启自动同步功能，之前默认是关闭的。

## TIPS

如在设置过程中有输入错误，按F1，输入 "sync reset" 清除设定，重新设置。
