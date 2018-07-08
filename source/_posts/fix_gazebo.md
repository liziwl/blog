---
title: 解决gazebo启动错误
date: 2018-03-19 18:12:29
categories:
- ROS
---
参考链接: [link](https://answers.ros.org/question/199401/problem-with-indigo-and-gazebo-22/)

<!-- more -->

# 错误信息
```bash
~$ gazebo
Gazebo multi-robot simulator, version 2.2.3
Copyright (C) 2012-2014 Open Source Robotics Foundation.
Released under the Apache 2 License.
http://gazebosim.org

Msg Waiting for master
Gazebo multi-robot simulator, version 2.2.3
Copyright (C) 2012-2014 Open Source Robotics Foundation.
Released under the Apache 2 License.
http://gazebosim.org

Msg Waiting for master
Msg Connected to gazebo master @ http://127.0.0.1:11345
Msg Publicized address: 192.168.1.152
Msg Connected to gazebo master @ http://127.0.0.1:11345
Msg Publicized address: 192.168.1.152
Warning [ModelDatabase.cc:334] Getting models from[http://gazebosim.org/models/]. This may take a few seconds.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Warning [gazebo.cc:215] Waited 1seconds for namespaces.
Error [gazebo.cc:220] Waited 11 seconds for namespaces. Giving up.
```

# 原因
Gazebo try to collect models from http://gazebosim.org/models but there is something wrong.

OR the folder `~/.gazebo/models` does not exist and Gazebo simulator can not start. 

# 解决方式
运行
```
wget -r -R "index\.html*" "http://models.gazebosim.org" --reject=tar.gz
```
Got all models from gazebosim and copy them into `~/.gazebo/models` folder and everything will be ok.