from PIL import Image
from os.path import abspath, dirname, join
from os import listdir
import json

project_root = abspath(join(dirname(abspath(__file__)), "./.."))

img_root = join(project_root, "source/photos/images/data")
json_output_path = join(project_root, "source/photos/photoslist.json")

dirs = listdir(img_root)
_json_out = dict()
count = 0

for d in dirs:
    path = join(img_root, d)
    _json_out[d] = dict()
    imgs = listdir(path)
    for img in imgs:
        if not "thumbnail" in img:
            im_path = join(path, img)
            with Image.open(im_path) as im:
                width, height = im.size
                _json_out[d][img] = {
                    "w": width,
                    "h": height
                }
                count += 1
_json_out['count'] = count

with open(json_output_path, "w", encoding="utf-8") as fp:
    json.dump(_json_out, fp)
    # print(_json_out)
