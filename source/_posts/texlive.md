---
title: Windows 下配置 TeXLive 和 VScode 的 $\LaTeX$ 环境
date: 2018-07-18 13:08:05
categories:
- 计算机拾遗
mathjax: true
---

快速部署 $\LaTeX$ 环境。
<!-- more -->

# 安装 TeXLive

首先要安装 TeXLive ，推荐下载 TeXLive 的 ISO 镜像，因为在线安装下载过程会很慢。
境内教育网镜像：

```
华中科大：http://mirror.hust.edu.cn/CTAN/systems/texlive/Images/texlive2018.iso
清华：https://mirrors.tuna.tsinghua.edu.cn/CTAN/systems/texlive/Images/texlive2018.iso
中科大：https://mirrors.ustc.edu.cn/CTAN/systems/texlive/Images/texlive2018.iso
```

下载完成后，挂载镜像，执行 `install-tl-advanced.bat` 开始安装。安装除了路径自定义以外，其他默认即可。

安装完确认，环境变量已经配置好。在高级系统设置的环境变量页面中，系统变量里面找到 `PATH`，并在末尾添加“`C:\texlive\bin\win32`”（在本例中路径为 `C:\texlive\` ，请根据实际情况自行更换路径。效果以打开命令提示符，能正常执行 `latex` 命令为准。

# 配置 VScode

1. 安装 LaTeX Workshop 插件
2. 在 Perferences -> Settings 里面添加 `xelatex` 编译语句

    ```json
    {
    "latex-workshop.latex.recipes": [
            {
                "name": "xelatex",
                "tools": [
                "xelatex"
                            ]
                    },
            {
                "name": "latexmk",
                "tools": [
                    "latexmk"
                ]
            },
            {
                "name": "pdflatex -> bibtex -> pdflatex*2",
                "tools": [
                    "pdflatex",
                    "bibtex",
                    "pdflatex",
                    "pdflatex"
                ]
            }
        ],
        "latex-workshop.latex.tools": [
            {
                "name": "xelatex",
                "command": "xelatex",
                "args": [
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "%DOC%"
                ]
            },
            {
                "name": "latexmk",
                "command": "latexmk",
                "args": [
                    "-synctex=1",
                    "-interaction=nonstopmode",
                    "-file-line-error",
                    "-pdf",
                    "%DOC%"
                ]
            },
            {
                "name": "pdflatex",
                "command": "pdflatex",
                "args": [
                    "-synctex=1",
                    "-interaction=nonstopmode",
                    "-file-line-error",
                    "%DOC%"
                ]
            },
            {
                "name": "bibtex",
                "command": "bibtex",
                "args": [
                    "%DOCFILE%"
                ]
            }
        ],
    }
    ```
3. 设置完成，即可使用。

`ctrl + s` 保存后 VScode 自动编译，右侧可以显示 pdf 非常方便。

**更多快捷键可以 `F1` 查看。**
