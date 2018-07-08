---
title: Ubuntu 16.04 安装 hadoop
date: 2018-03-16 11:44:52
categories: 
- 计算机拾遗
---

Copy line by line and paste to an interactive shell

<!-- more -->

# Create a new user named hadoop
```bash
sudo useradd -m hadoop -s /bin/bash     # 创建hadoop用户
sudo passwd hadoop          # 修改密码
sudo adduser hadoop sudo    # 增加管理员权限
```

# Log out current user, log in hadoop
```bash
sudo apt-get update         # Update system
```

# Install ssh
```bash
sudo apt-get install openssh-server
cd ~
mkdir .ssh                  # 可能该文件已存在，不影响
cd ~/.ssh/
ssh-keygen -t rsa           # 会有提示，都按回车就可以
cat id_rsa.pub >> authorized_keys  # 加入授权
```

# Install Java
参照这个安装Java JDK，推荐安装Oracle 
> https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-get-on-ubuntu-16-04

1. 安装openjdk
```bash
sudo apt-get update # 更新软件包列表
sudo apt-get install openjdk-8-jdk
```

2. 安装oracle Java JDK
```bash
sudo add-apt-repository ppa:webupd8team/java # 添加仓库源
sudo apt-get update # 更新软件包列表
sudo apt-get install oracle-java8-installer
```

已经装了多种Java版本，可以选择更换
```bash
sudo update-alternatives --config java
```

# Download & Install Hadoop
```bash
wget https://mirrors.tuna.tsinghua.edu.cn/apache/hadoop/common/hadoop-3.0.0/hadoop-3.0.0.tar.gz -P ~/Downloads
sudo tar zxvf ~/Downloads/hadoop-3.0.0.tar.gz -C /usr/local
sudo mv /usr/local/hadoop-3.0.0 /usr/local/hadoop
sudo chown -R hadoop /usr/local/hadoop
```

# Configure hadoop
```bash
echo "export JAVA_HOME=$(readlink -f $(which java) | sed "s:bin/java::")" >> /usr/local/hadoop/etc/hadoop/hadoop-env.sh
```

## Configure core-site.xml
```bash
sudo vim /usr/local/hadoop/etc/hadoop/core-site.xml
```
```
<configuration>
    <property>
        <name>hadoop.tmp.dir</name>
        <value>file:/usr/local/hadoop/tmp</value>
        <description>Abase for other temporary directories.</description>
    </property>
    <property>
        <name>fs.defaultFS</name>
        <value>hdfs://localhost:9000</value>
    </property>
</configuration>
```

## Configure hdfs-site.xml
```bash
sudo vim /usr/local/hadoop/etc/hadoop/hdfs-site.xml
```
```
<configuration>
    <property>
        <name>dfs.replication</name>
        <value>1</value>
    </property>
    <property>
        <name>dfs.namenode.name.dir</name>
        <value>file:/usr/local/hadoop/tmp/dfs/name</value>
    </property>
    <property>
        <name>dfs.datanode.data.dir</name>
        <value>file:/usr/local/hadoop/tmp/dfs/data</value>
    </property>
</configuration>
```

# Configure environment
```bash
echo "
export JAVA_HOME=$(readlink -f $(which java) | sed "s:/jre/bin/java::")
export PATH=\$PATH:\$JAVA_HOME/bin
export PATH=\$PATH:\$HADOOP_HOME/bin
export HADOOP_HOME=/usr/local/hadoop
export HADOOP_CLASSPATH=${JAVA_HOME}/lib/tools.jar
" >> ~/.bashrc
source ~/.bashrc
```
# start hadoop
```bash
cd /usr/local/hadoop
bin/hdfs namenode -format      # namenode 格式化
sbin/start-dfs.sh              # 开启守护进程
jps                             # 判断是否启动成功
```

> 注：勿反复使用hdfs namenode -format 命令 ,如果修改配置后选择N
>
> 如需关闭hadoop 进程则可以使用 stop-dfs.sh，第二次启动直接运行 start-dfs.sh

# Test hadoop
Save source code from the url, as WordCount.java in `/usr/local/hadoop`.

> WordCount1.0 ver
>
> http://hadoop.apache.org/docs/current/hadoop-mapreduce-client/hadoop-mapreduce-client-core/MapReduceTutorial.html

```bash
cd /usr/local/hadoop
bin/hadoop com.sun.tools.javac.Main WordCount.java
jar -cvf wordcount.jar *.class

bin/hadoop fs -mkdir /input_wordcount
bin/hadoop fs -put input/* /input_wordcount/ 

bin/hadoop fs -ls /                     # 查看文件
bin/hadoop fs -ls /input_wordcount          # 查看file1 file2
bin/hadoop fs -cat /input_wordcount/file1   # 打印文件
bin/hadoop jar wordcount.jar WordCount /input_wordcount /output_wordcount   # 进行运算

bin/hadoop fs -ls /output_wordcount
bin/hadoop fs -cat /output_wordcount/part-r-00000     # 查看结果
```