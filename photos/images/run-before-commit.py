from PIL import Image
import glob
import os

#
# 限定只使用jpg后缀！！！
#

for infile in glob.glob("*.thumbnail*"):
    os.remove(infile)

size = 1000, 1000

for infile in glob.glob("*.jpg"):
    if 'thumbnail' not in infile:
        file_prefix, ext = os.path.splitext(infile)
        im = Image.open(infile)
        im.thumbnail(size, Image.ANTIALIAS)
        im.save(file_prefix + ".thumbnail.jpg", "JPEG")
