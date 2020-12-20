from PIL import Image
import os
import json

img_root = "source/photos/images/data"
json_output_path = "source/photos/photoslist.json"

dirs = os.listdir(img_root)
_json_out = dict()

for d in dirs:
    path = os.path.join(img_root, d)
    year, month = d.split("-")
    _json_out[year] = dict()
    _json_out[year][month] = dict()
    imgs = os.listdir(path)
    for img in imgs:
        if not "thumbnail" in img:
            im_path = os.path.join(path, img)
            with Image.open(im_path) as im:
                width, height = im.size
                _json_out[year][month][img] = {
                    "w": width,
                    "h": height
                }

with open(json_output_path, "w", encoding="utf-8") as fp:
    json.dump(_json_out, fp)
    # print(_json_out)
