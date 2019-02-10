---
title: Hexo 增加相册页面
date: 2019-02-10 23:22:18
categories:
- hexo
---

## 项目需要的服务

1. 图床：用腾讯云Git托管 ([http://dev.tencent.com](http://dev.tencent.com)) 代替，保证国内加载速度且免费，也可以都用 Github 托管。

<!-- more -->

## 代码修改

1. 安装 npm 依赖，并更新 `package.json`
   
   ```
   npm install exif --save
   npm install image-size --save
   ```

3. 主题配置文件：`themes/next/_config.yml`

   ```diff
   @@ -119,6 +119,7 @@ menu:
      categories: /categories/ || th
      about: /about/ || user
      archives: /archives/ || archive
   +  Photos: /photos/ || image
      #schedule: /schedule/ || calendar
      #sitemap: /sitemap.xml || sitemap
      #commonweal: /404/ || heartbeat
   @@ -780,7 +781,7 @@ motion:
    # Please, choose only any one variant, do not need to install both.
    # For install 2.x: https://github.com/theme-next/theme-next-fancybox
    # For install 3.x: https://github.com/theme-next/theme-next-fancybox3
   -fancybox: false
   +fancybox: true
    
    # Added switch option for separated repo in 6.0.0.
    # Dependencies: https://github.com/theme-next/theme-next-fastclick
   @@ -788,7 +789,7 @@ fastclick: false
    
    # Added switch option for separated repo in 6.0.0.
    # Dependencies: https://github.com/theme-next/theme-next-jquery-lazyload
   -lazyload: false
   +lazyload: true
    
    # Progress bar in the top during page loading.
    # Dependencies: https://github.com/theme-next/theme-next-pace
   @@ -851,8 +852,8 @@ vendors:
    
      # Internal version: 2.1.5
      # See: http://fancyapps.com/fancybox/
   -  fancybox:
   -  fancybox_css:
   +  fancybox: https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.js
   +  fancybox_css: https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.6/jquery.fancybox.css
    
      # Internal version: 1.0.6
      # See: https://github.com/ftlabs/fastclick
   @@ -860,7 +861,7 @@ vendors:
    
      # Internal version: 1.9.7
      # See: https://github.com/tuupola/jquery_lazyload
   -  lazyload:
   +  lazyload: https://cdn.jsdelivr.net/npm/lazyload@2.0.0-beta.2/lazyload.js
    
      # Internal version: 1.2.1
      # See: http://VelocityJS.org
   ```

4. 主题CSS配置：
   * `themes/next/source/css/_common/components/post/post-expand.styl`
   
   ```diff
   +.posts-expand .post-body .ImageGrid-container .ImageGrid .card img { margin: auto; }
    .posts-expand .post-body .fancybox img { margin: 0 auto 25px; }
    .posts-expand .post-body img { margin: 0 auto 25px; }
   ```
   
   * `layout/_scripts/commons.swig` 
   
   ```diff
   @@ -1,9 +1,20 @@
   +{% if page.type ==='picture' %}
   +{%
   +  set js_commons = [
   +    'src/utils.js',
   +    'src/motion.js',
   +    'src/minigrid.min.js',
   +    'src/photo.js',
   +  ]
   +%}
   +{% else %}
    {%
      set js_commons = [
        'src/utils.js',
        'src/motion.js'
      ]
    %}
   +{% endif %}
    
    {% for common in js_commons %}
      <script type="text/javascript" src="{{ url_for(theme.js) }}/{{ common }}?v={{ theme.version }}"></script>
   ```
   
   * `source/css/_custom/custom.styl`  
   
   ```diff
   @@ -1 +1,29 @@
   // Custom styles.
   +
   +// 相册样式
   +.ImageGrid {
   +    width: 100%;
   +    max-width: 1040px;
   +    margin: 0 auto;
   +    text-align: center;
   +}
   +
   +.card {
   +    overflow: hidden;
   +    transition: .3s ease-in-out;
   +    border-radius: 8px;
   +    background-color: #ddd;
   +}
   +
   +.ImageInCard {
   +}
   +
   +.ImageInCard img {
   +    padding: 0 0 0 0;
   +}
   +
   +.TextInCard {
   +    line-height: 54px;
   +    background-color: #ffffff;
   +    font-size: 24px;
   +}
   ```
   
5. 相册页面静态化时自定义js：`scripts/phototool.js`

   ```js
   "use strict";
   const fs = require("fs");
   const ExifImage = require('exif').ExifImage;
   const sizeOf = require('image-size');
   //本地照片所在目录
   const path = "source/photos/images";
   //要放置生成的照片信息文件目录，建议直接放在 source/photos/ 文件夹下
   const output = "source/photos/photoslist.json";
   var _json_out = {};
   var itemsProcessed = 0;
   var photo_count = 0;

   fs.readdir(path, function (err, files) {
       if (err) throw err;

       files.forEach(function (file) {
           var path_file = path + "/" + file;
           fs.stat(path_file, function (err, stats) {
               if (err) throw err;

               if (stats.isFile()) {
                   console.log("%s is file", path_file);
                   new ExifImage({ image: path_file }, function (error, exifData) {
                       if (error) {
                           console.log('Error: ' + error.message);
                       }
                       else {
                           var shot_time = "";
                           var capture_time = exifData['exif']['DateTimeOriginal'];
                           if (typeof capture_time === 'undefined') {
                               shot_time = stats['mtime'];
                               // 这里时区有点小问题
                           }
                           else {
                               var tmp = capture_time.split(" ");
                               var new_time = tmp[0].replace(":", "-") + " " + tmp[1] + "+08:00";
                               shot_time = new Date(new_time);
                           }

                           var y = shot_time.getFullYear();
                           var m = shot_time.getMonth() + 1;
                           console.log(typeof shot_time);
                           console.log(shot_time);

                           var dimensions = sizeOf(path_file);
                           console.log(dimensions.width, dimensions.height);
                           var this_file = {};
                           this_file['w'] = dimensions.width;
                           this_file['h'] = dimensions.height;

                           if (typeof _json_out[y] === 'undefined') {
                               _json_out[y] = {};
                           }
                           if (typeof _json_out[y][m] === 'undefined') {
                               _json_out[y][m] = {};
                           }
                           _json_out[y][m][file] = this_file;

                           itemsProcessed++;
                           photo_count++;
                           // console.log("+++++++++++++++++++++++++++");
                           // console.log(JSON.stringify(_json_out, null, 2));
                           // console.log(itemsProcessed);
                           // console.log(files.length);
                           if (itemsProcessed === files.length) {
                               console.log(JSON.stringify(_json_out, null, 2));
                               _json_out['count'] = photo_count;
                               fs.writeFileSync(output, JSON.stringify(_json_out, null, 2));
                           }
                       }
                   });
               }
               else if (stats.isDirectory()) {
                   console.log("%s is a directory", file);
                   itemsProcessed++;
                   // console.log("***********************");
                   // console.log(JSON.stringify(_json_out, null, 2));
                   // console.log(itemsProcessed);
                   // console.log(files.length);
                   if (itemsProcessed === files.length) {
                       console.log(JSON.stringify(_json_out, null, 2));
                       _json_out['count'] = photo_count;
                       fs.writeFileSync(output, JSON.stringify(_json_out, null, 2));
                   }
               }
           });
       });
   });
   ```

6. 相册页面加载时自定义js：`source/js/src/photo.js`

   ```js
   photo = {
       page: 1,
       //offset 用于设置照片数量的上限
       offset: 100,
       init: function () {
           var that = this;
           //这里设置的是刚才生成的 json 文件路径
           $.getJSON("./photoslist.json", function (data) {
               that.render(that.page, data);
               //that.scroll(data);
           });
       },
       render: function (page, data) {
           var begin = (page - 1) * this.offset;
           var end = page * this.offset;
           if (begin >= data.length) return;
           var html, imgNameWithPattern, imgName, imageSize, imageX, imageY, li = "";
           // console.log(data);
           var years = Object.keys(data);
           years.sort();
           // console.log(years);

           for (var i = 0, leni = years.length; i < leni; i++) {
               if (years[i] !== "count") {
                   // console.log(years[i]);
                   var flag = false;
                   for (var j = 1; j < 13; j++) {
                       if (typeof data[years[i]][j] !== 'undefined') {
                           // 有效月
                           flag = true;
                           li += '<h1>' + years[i] + '年<em>' + j + '月</em></h1>' +
                               '<div class="ImageGrid">';
                           images = Object.keys(data[years[i]][j]);
                           images.sort();
                           for (var k = 0, lenk = images.length; k < lenk; k++) {
                               imgNameWithPattern = images[k];
                               imgName = imgNameWithPattern.split('.')[0];
                               imageW = data[years[i]][j][imgNameWithPattern]['w'];
                               imageH = data[years[i]][j][imgNameWithPattern]['h'];
                               //这里 380 指的是图片的宽度，可以根据自己的需要调整相册中照片的大小
                               li += '<div class="card" style="width:380px">' +
                                   '<div class="ImageInCard" style="height:' + 380 * imageH / imageW + 'px">' +
                                   //href 和 src 的链接地址是相册照片外部链接，也可以放博客目录里
                                   '<a data-fancybox="gallery" href="https://dev.tencent.com/u/lizi_wl/p/BlogPhotos/git/raw/master/' + imgNameWithPattern + '" data-caption="' + imgName + '">' +
                                   '<img src="https://dev.tencent.com/u/lizi_wl/p/BlogPhotos/git/raw/master/' + imgNameWithPattern + '"/>' +
                                   '</a>' +
                                   '</div>' +
                                   // '<div class="TextInCard">' + imgName + '</div>' +  //图片下显示文件名作为说明的功能
                                   '</div>';
                           }
                       }
                   }
                   if (flag) {
                       li += "</div>";
                   }
               }
           }
           $(".ImageGrid-container").append(li);
           $(".ImageGrid-container").lazyload();
           this.minigrid();
       },
       minigrid: function () {
           var grid = new Minigrid({
               container: '.ImageGrid',
               item: '.card',
               gutter: 12
           });
           grid.mount();
           $(window).resize(function () {
               grid.mount();
           });
       }
   }
   photo.init();
   ```

   * 下载依赖 `source/js/src/minigrid.min.js`：https://unpkg.com/minigrid@3.1.1/dist/minigrid.min.js
   * 安装依赖 `fancybox3`：https://github.com/theme-next/theme-next-fancybox3

        ```bash
        rm -rf themes/next/source/lib/fancybox
        cd themes/next
        git clone https://github.com/theme-next/theme-next-fancybox3 source/lib/fancybox
        cd themes/next/source/lib/fancybox
        rm -rf .git/
        ```

7. 相册页面MD文件：`source/photos/index.md`

   ```md
   ---
   title: 相册
   date: 2019-02-02 10:18:48
   type: "picture"
   ---
   <div class="ImageGrid-container"></div>
   ```

8. 相册页面展示图片路径：`source/photos/images`
   * 静态化时，即运行 `hexo g` 前在此路径中放入图片

# TOFIX
1. `scripts/phototool.js` 生成 json 的时候如果直接从 EXIF 中读会有点小问题，把 UTC+0 作为记录时区，然后转换为为本地时区，但是对日期影响不大，相册按月份分类。