---
title: Ubuntu安装ngrok服务端
date: 2018-03-05 11:42:12
categories: 
- 计算机拾遗
notshow: true
---

如果要有实现内网穿透的功能ngrok是个不错的选择，这篇就讲下如何配置ngrox。

使用的是开源的[ngrox1.0](https://github.com/inconshreveable/ngrok)，目前2.0版本尚未开源。

<!-- more -->

# 编译 ngrok
假定工作目录为`/home/ubuntu/opt/`，这个随意，根据自己使用改。
```bash
sudo apt-get update
sudo apt-get install build-essential golang mercurial git
# 安装依赖
cd ngrok
#设置域名，注意改成你自己的域名
export NGROK_DOMAIN="your.domain.com"
#设置go编译路径
export GOPATH=/home/ubuntu/opt/ngrok

#生成证书
openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key -subj "/CN=$NGROK_DOMAIN" -days 5000 -out rootCA.pem
openssl genrsa -out device.key 2048
openssl req -new -key device.key -subj "/CN=$NGROK_DOMAIN" -out device.csr
openssl x509 -req -in device.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out device.crt -days 5000
cp rootCA.pem assets/client/tls/ngrokroot.crt
cp device.crt assets/server/tls/snakeoil.crt
cp device.key assets/server/tls/snakeoil.key

#编译
sudo make release-server release-client
```

此时，如果没有报错的话，`./ngrok/bin`目录下会有`ngrok`和`ngrokd`可执行文件。

```
└── bin
    ├── go-bindata
    ├── ngrok
    └── ngrokd
```

# 运行 ngrok服务端
```bash
cd ~/opt/ngrok/bin/
./ngrokd -domain="your.domain.com" -httpAddr=":8081" -httpsAddr=":8082"
```
正常的话会显示下面类似的信息。

![信息](/images/0305.png)

# 设置DNS解析
在域名服务商，设置`your.domain.com`域名解析到运行ngrok服务器的IP。

访问http://test.your.domain.com:8081
如果出现
> Tunnel test.your.domain.com:8081 not found
就说明服务器搭建成功。

接下来设置客户端。
