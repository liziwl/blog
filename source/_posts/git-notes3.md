---
title: git-解决 Windows 下Git SSH 代理设置
date: 2020-04-06 19:08:39
categories:
- git
---

不知道为啥，我电脑上的 HTTP Git token 过段时间就过期，又要重新授权，就很烦。想到 SSH 没有这个但是速度比较慢，HTTP 设置很简单。SSH稍微复杂一些今天就介绍一下。

<!-- more -->

## http 的代理设置 Windows & Unix

1080 为 代理服务器 (127.0.0.1) 的端口。

```bash
# 设置 -- 代理服务器 为 http 协议
git config --global http.proxy http://127.0.0.1:1080
git config --global https.proxy http://127.0.0.1:1080

# 设置 -- 代理服务器 为 socks5 协议
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'

# 取消设置
git config --global --unset http.proxy
git config --global --unset https.proxy
```

## SSH 的代理设置

### Windows

1. 进入自己的用户目录 `C:\Users\YOUR_NAME\.ssh`
2. 新建或者打开文件 `config`

```
Host github.com
  User git
  Port 22
  Hostname github.com
  IdentityFile "C:\Users\YOUR_NAME\.ssh\id_ed25519"
  TCPKeepAlive yes
  ProxyCommand "C:\Program Files\Git\mingw64\bin\connect.exe" -S 127.0.0.1:1080 %h %p

Host ssh.github.com
  User git
  Port 443
  Hostname ssh.github.com
  IdentityFile "C:\Users\YOUR_NAME\.ssh\id_ed25519"
  TCPKeepAlive yes
  ProxyCommand "C:\Program Files\Git\mingw64\bin\connect.exe" -S 127.0.0.1:1080 %h %p
```

`IdentityFile` 就是你的 SSH 私钥文件名

`ProxyCommand` 是代理命令，后面是 Git 自带的 `connect` 注意路径和实际一致。 `-S` 参数意味着 使用 sock 协议代理，如果使用 http 协议代理使用 `-H` 参数。


### Unix

稍有不同，因为我用的是 Manjaro 没有自带 netcat 也就是 nc。特别注意这里使用的是 **OpenBSD** 的 netcat，不是 GNU 的 netcat。

```
Host github.com
    User git
    Port 22
    Hostname github.com
    IdentityFile "/home/YOUR_NAME/.ssh/id_ed25519"
    TCPKeepAlive yes
    ProxyCommand nc -X connect -x 127.0.0.1:7890 %h %p  # HTTP proxy
    ProxyCommand nc -x 127.0.0.1:7891 %h %p  # sock proxy


Host ssh.github.com
    User git
    Port 443
    Hostname ssh.github.com
    IdentityFile "/home/YOUR_NAME/.ssh/id_ed25519"
    TCPKeepAlive yes
    ProxyCommand nc -X connect -x 127.0.0.1:7890 %h %p  # HTTP proxy
    ProxyCommand nc -x 127.0.0.1:7891 %h %p  # sock proxy
```
