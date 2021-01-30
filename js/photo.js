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

        var year_and_month = Object.keys(data);
        year_and_month.sort();
        for (let i = 0; i < year_and_month.length; i++) {
            const yyyy_mm = year_and_month[i];
            if (yyyy_mm === "count") {
                continue;
            }

            let yyyy = yyyy_mm.split('-')[0];
            let mm = yyyy_mm.split('-')[1];
            li += '<h1>' + yyyy + '年<em>' + mm + '月</em></h1>' +
                '<div class="ImageGrid">';
            let images = Object.keys(data[yyyy_mm]);
            images.sort();
            let flag = false;
            for (let j = 0; j < images.length; j++) {
                const img_file_name = images[j];
                imgNameWithPattern = img_file_name;
                imgName = imgNameWithPattern.split('.')[0];
                imgThumb = imgName + ".thumbnail.jpg";
                imageW = data[yyyy_mm][img_file_name]['w'];
                imageH = data[yyyy_mm][img_file_name]['h'];
                //这里 380 指的是图片的宽度，可以根据自己的需要调整相册中照片的大小
                li += '<div class="card">' +
                    '<div class="ImageInCard">' +
                    //href 和 src 的链接地址是相册照片外部链接，也可以放博客目录里
                    '<a data-fancybox="gallery" href="https://liziwl.coding.net/p/BlogPhotos/d/BlogPhotos/git/raw/master/data/' + yyyy_mm + "/" + imgNameWithPattern + '" data-caption="' + imgName + '">' +
                    '<img class="lozad" data-src="https://liziwl.coding.net/p/BlogPhotos/d/BlogPhotos/git/raw/master/data/' + yyyy_mm + "/" + imgThumb + '"/>' +
                    '</a>' +
                    '</div>' +
                    // '<div class="TextInCard">' + imgName + '</div>' +  //图片下显示文件名作为说明的功能
                    '</div>';
                flag = true;
            }
            if (flag) {
                li += "</div>";
            }
        }

        $(".ImageGrid-container").append(li);
        // $(".ImageGrid-container").lazyload();
        this.minigrid();
    },
    minigrid: function () {
        var grid = new Minigrid({
            container: '.ImageGrid',
            item: '.card',
            gutter: 12
        });
        const observer = lozad(); // lazy loads elements with default selector as '.lozad'
        observer.observe();

        setInterval(function () { grid.mount(); }, 500);

        $(window).resize(function () {
            grid.mount();
        });
        $(window).scroll(function () {
            grid.mount();
        });
    }
}

window.onload = function () {
    photo.init();
    // $.getScript("https://cdn.jsdelivr.net/npm/lazyload@2.0.0-beta.2/lazyload.js")
    //     .done(function (script, textStatus) {
    //         photo.init();
    //     });
}