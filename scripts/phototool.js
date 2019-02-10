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

