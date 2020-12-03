---
title: '404 - 真巧，竟然在这里遇到你！'
date: 2020-09-12 23:01:35
comments: false
permalink: /404.html
---

<!-- markdownlint-disable MD039 MD033 -->

## 这是一个不存在的页面

很抱歉，你目前访问的页面并不存在。

预计将在约 <span id="timeout">5</span> 秒后返回首页。

如果你很急著想看文章，你可以 **[点这里](https://hsiangfeng.github.io/)** 返回首页。

<script>
let countTime = 5;

function count() {
  
  document.getElementById('timeout').textContent = countTime;
  countTime -= 1;
  if(countTime === 0){
    location.href = 'http://blog.liziwl.cn/'; // 記得改成自己網址 Url
  }
  setTimeout(() => {
    count();
  }, 1000);
}

count();
</script>
