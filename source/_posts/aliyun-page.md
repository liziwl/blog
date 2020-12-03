---
title: 阿里云自定义域名的静态网站部署 OSS + CDN + HTTPS 
date: 2020-12-03 18:35:20
categories:
- hexo
---

使用以下服务域名均需备案，且最好 DNS 解析 托管在阿里云。

<!-- more -->

## 创建子账户获取 AccessKey ID 和 AccessKey Secret（可选）

这里使用了 CI 服务（GitHub Action），自动化部署需要生成子账户完成授权。
在 `RAM 访问控制` （ https://ram.console.aliyun.com/users ）中，申请子账户，并授予`编程访问`（启用 AccessKey ID 和 AccessKey Secret，支持通过 API 或其他开发工具访问）。

1. 申请子账户（授予`编程访问`）
2. 保存 AccessKey ID 和 AccessKey Secret

## 创建对象存储对象-桶

1. 创建对象存储对象-桶（私有），并启用全球加速接入

如果同样使用 GitHub Action，可以采用以下配置文件。使用[manyuanrong/setup-ossutil](https://github.com/manyuanrong/setup-ossutil)的插件，这里的 `endpoint` 启用了阿里云的全球加速接入，需要自行启用（建议），或者可以改用桶的地域接入域名。

![](/images/aliyun-page/oss-1.png)

配置文件中的 `./public_artifact` 为静态网页编译输出目录， `oss://OSS_BUCKET/` 为对象存储桶名，需要自行修改。

```yaml
    - name: setup aliyun oss
    uses: manyuanrong/setup-ossutil@master
    with:
        endpoint: oss-accelerate.aliyuncs.com
        access-key-id: ${{ secrets.OSS_KEY_ID }}
        access-key-secret: ${{ secrets.OSS_KEY_SECRET }}

    - name: cp files to aliyun
    run: ossutil cp -rf ./public_artifact oss://OSS_BUCKET/
```

2. 创建桶后，需要给予之前创建的子账号管理权限（完全控制）。
    ![](/images/aliyun-page/oss-2.png)
3. 于基础设置中启用静态页面配置
    ![](/images/aliyun-page/oss-3.png)
    需要配置 404 页面。Hexo 默认好像是没有 404页面的，需要自行创建。

4. 如果部署了持续集成，每次部署会自动上传到对应的对象存储桶中。如没有使用持续集成，则需要手动上传。

## 配置 CDN

其实直接将对象存储桶设置为公有读私有写一样可以访问，但是阿里云的对象存储流量稍贵，故这里套一层 CDN 降低流量费用，内网回源免流量费用，并且解决一个小 bug：首页 `/` 无法跳转到 `/index.html`。阿里云 CDN 中有 URL 重写功能能解决这个 bug。

### 申请 SSL证书（启用HTTPS）

搜索 `证书`，找到 SSL证书 申请页面。阿里云也提供免费证书申请，只不过选项较多不太好找。如图所示，申请证书。按照提示验证，等待签发，无需下载证书。

![](/images/aliyun-page/cdn%20(8).png)

## 配置 CDN 细节

1. 创建 CDN 配置
   1. 设定加速域名为自定义域名
   2. 业务类型选择图片小文件
   3. 源站信息选择OSS
   4. 端口选择443
   5. 加速区域选择“仅中国内地”
   6. 配置域名解析 CNAME 为分配的加速域名
    ![](/images/aliyun-page/cdn%20(5).png)

2. 启用优化配置 
   1. 启用 阿里云OSS私有 Bucket 回源
    ![](/images/aliyun-page/cdn%20(2).png)
   2. 创建重写URL规则，修复访问错误
    ![](/images/aliyun-page/cdn%20(3).png)
   3. 启用 TLS
    ![](/images/aliyun-page/cdn%20(1).png)
   4. 启用 HTTPS，选择前面申请的SSL证书
    ![](/images/aliyun-page/cdn%20(4).png)
   5. 启用各种压缩和优化
    ![](/images/aliyun-page/cdn%20(6).png)
   6. 启用 IPv6
    ![](/images/aliyun-page/cdn%20(7).png)







