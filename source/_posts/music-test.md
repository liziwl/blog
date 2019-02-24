---
title: Hexo 音乐插件测试
date: 2019-02-24 11:48:41
categories: 
- hexo
---

{% meting "720390782" "xiami" "playlist" %}

<!-- more -->

# 配置插件
```bash
npm install hexo-tag-aplayer --save
npm install hexo-tag-dplayer --save
```

插件 Github 仓库：
* https://github.com/MoePlayer/hexo-tag-aplayer
* https://github.com/MoePlayer/hexo-tag-dplayer

# 修改 Hexo 根目录配置文件 `_config.yml`

```yaml
aplayer:
  meting: true
```

以下引用插件作者说明：

Now you can use in your post:

```
<!-- Simple example (id, server, type)  -->
{% meting "60198" "netease" "playlist" %}

<!-- Advanced example -->
{% meting "60198" "netease" "playlist" "autoplay" "mutex:false" "listmaxheight:340px" "preload:none" "theme:#ad7a86"%}
```

The options are shown below:

| Option        | Default      | Description                                                  |
| ------------- | ------------ | ------------------------------------------------------------ |
| id            | **required** | song id / playlist id / album id / search keyword            |
| server        | **required** | Music platform: `netease`, `tencent`, `kugou`, `xiami`, `baidu` |
| type          | **required** | `song`, `playlist`, `album`, `search`, `artist`              |
| fixed         | `false`      | Enable fixed mode                                            |
| mini          | `false`      | Enable mini mode                                             |
| loop          | `all`        | Player loop play, values: 'all', 'one', 'none'               |
| order         | `list`       | Player play order, values: 'list', 'random'                  |
| volume        | 0.7          | Default volume, notice that player will remember user setting, default volume will not work after user set volume themselves |
| lrctype       | 0            | Lyric type                                                   |
| listfolded    | `false`      | Indicate whether list should folded at first                 |
| autoplay      | `false`      | Autoplay song(s), not supported by mobile browsers           |
| mutex         | `true`       | Pause other players when this player playing                 |
| listmaxheight | `340px`      | Max height of play list                                      |
| preload       | `auto`       | The way to load music, can be `none`, `metadata`, `auto`     |
| storagename   | `metingjs`   | LocalStorage key that store player setting                   |
| theme         | `#ad7a86`    | Theme color                                                  |

Read section [customization](#customization-new-in-30)  to learn how to configure self-host meting api server in `hexo-tag-aplayer` and other configuration.
