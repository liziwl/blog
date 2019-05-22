---
title:  Ubuntu 16.04 CUDA 安装
date: 2018-08-04 15:15:38
categories:
- 机器学习
notshow: true
---

# 环境
* Ubuntu 16.04 LTS
* CUDA 9.2 [官网](https://developer.nvidia.com/cuda-toolkit) 选择 runfile(local)版本
* Anaconda Python3.6 [官网](https://www.anaconda.com/download/)

<!-- more -->

# 安装

## 安装CUDA

要点：
* 禁用图形界面服务
* BIOS 调整至显卡显示，否则会出现循环登陆错误
* 不需要另外安装驱动，直接使用CUDA安装包内驱动，否则可能不兼容。

1. 禁用图形服务

    ```bash
    sudo /etc/init.d/lightdm stop   # 禁用图形服务
    sudo rm ~/.Xauthority           # 删除X11 配置文件
    ```

    然后，切换至命令行模式操作。


2. 安装一些必要依赖

    ```
    sudo apt-get install freeglut3-dev build-essential libx11-dev libxmu-dev libxi-dev libgl1-mesa-glx libglu1-mesa libglu1-mesa-dev
    ```

3. 安装CUDA

    ```bash
    sudo sh cuda_9.2.148_396.37_linux.run
    ```

    安装过程中所有提示选择YES，包括安装 NVIDIA 驱动。路径默认即可。

4. 重启图形服务

    ```bash
    sudo /etc/init.d/lightdm restart
    sudo reboot #重启系统，使得设置生效。
    ```

## 安装 Anaconda

1. 运行安装脚本

    ```bash
    sudo sh Anaconda3-5.2.0-Linux-x86_64.sh
    ```

2. 设置用户权限，否则无法 pip 安装包

    ```bash
    sudo chown -R xxx:yyy anaconda3/    # 将 xxx，yyy更换为用户名和组名，一般情况xxx和yyy相同。
    pip install msgpack
    ```

## 安装 Pytorch

* 可以创建新的个人虚拟环境，然后安装 Pytorch。或者直接在 conda 的 base 环境安装，这里省去自定义环境环节。

1. 按照官网输入命令，输入时替换 pip3 为 pip。因为 conda 默认的 pip 就是 pip3。
2. 测试环境，输入 `python` 打开交互命令行。输入以下命令，不报错就安装正确。

    ```python
    import torch                # 不报错，torch 安装正确
    torch.cuda.is_available()   
    # Ture
    # 返回以上字段，CUDA 和 torch 安装兼容，后面可以使用 GPU 进行学习。
    ```