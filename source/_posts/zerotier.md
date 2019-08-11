---
title: zerotier 配置 moon
date: 2019-08-11 23:03:46
categories: 
- 计算机拾遗
notshow: true
---

由于国内网络的复杂的情况， ZeroTier 的点与点连接很有可能建立失败。此时机器之间的连接就会绕道国外，造成较大的延迟和丢包率。在 ZeroTier 1.2.0 版本之后，一项新的功能被加入进来：“自定义根服务器”，又称 moon。通过自定义的服务器作为跳板加速内网机器之间的互相访问。本文简要介绍了 ZeroTier moon 的设置方法。

## 准备
1. 公网机器A -- moon
2. 内网机器B


<!-- more -->

## 详细配置
### 生成及修改 moon.json

首先ssh到机器 A 上，前往路径 `/var/lib/zerotier-one`，输入命令

```bash
sudo sh -c "zerotier-idtool initmoon identity.public >> moon.json"
```

此命令会在当前目录下生成一个文件 `moon.json`，文件内容类似如下:

```json
{
  "id": "deadbeef00",
  "objtype": "world",
  "roots": [
    {
      "identity": "deadbeef00:0:34031483094...",
      "stableEndpoints": []
    }
  ],
  "signingKey": "b324d84cec708d1b51d5ac03e75afba501a12e2124705ec34a614bf8f9b2c800f44d9824ad3ab2e3da1ac52ecb39ac052ce3f54e58d8944b52632eb6d671d0e0",
  "signingKey_SECRET": "ffc5dd0b2baf1c9b220d1c9cb39633f9e2151cf350a6d0e67c913f8952bafaf3671d2226388e1406e7670dc645851bf7d3643da701fd4599fedb9914c3918db3",
  "updatesMustBeSignedBy": "b324d84cec708d1b51d5ac03e75afba501a12e2124705ec34a614bf8f9b2c800f44d9824ad3ab2e3da1ac52ecb39ac052ce3f54e58d8944b52632eb6d671d0e0",
  "worldType": "moon"
}
```

其中 `"identity"` 为机器 A 在 `/var/lib/zerotier-one/identity.public`，应该已经导入无需修改

修改 `"stableEndpoints"` 为机器 A 的公网的 IP。如：

```
"stableEndpoints": [ "1.2.3.4/9993","2001:abcd:abcd::1/9993" ]
```

若公网机器没有 IPv6 地址，则将其修改为
```
"stableEndpoints": [ "1.2.3.4/9993" ]
```

### 生成签名文件
修改完 `moon.json` 后，执行命令

```bash
sudo zerotier-idtool genmoon moon.json
```

此命令会生成一个签名文件在当前目录下，文件名如 `000000deadbeef00.moon` （机器 A 的 id 为 `deadbeef00`)

### 将 moon 节点加入 ZeroTier 网络
在机器 A 中的 ZeroTier 目录中建立子文件夹 `moons.d`

Linux: `/var/lib/zerotier-one`
将在机器 A 生成的 `000000deadbeef00.moon` 拷贝进 `moons.d` 文件夹中，并重启 ZeroTier（此步好像有些许 bug，重启电脑为佳）

```bash
sudo killall -9 zerotier-one # 关闭
sudo zerotier-one -d # 启动
```

### 其他节点连接 moon 节点

```bash
sudo zerotier-cli orbit deadbeef00 deadbeef00
```

## 参考

[ZeroTier | Manual -- 4.4. Creating Your Own Roots (a.k.a. Moons)](https://www.zerotier.com/manual.shtml#4_4)