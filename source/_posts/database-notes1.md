---
title: 数据库-1（primary key与unique的区别）
date: 2017-09-22 09:10:13
categories:
- 数据库
---
定义了**UNIQUE**约束的字段中不能包含重复值，可以为一个或多个字段定义**UNIQUE**约束。因此，**UNIQUE**即可以在字段级也可以在表级定义， 在 **UNIQUED**约束的字段上可以包含空值。ORACLE自动会为具有**PRIMARY KEY**约束的字段(主码字段)建立一个唯一索引和一个NOT NULL约束,定义PRIMARY KEY约束时可以为它的索引；

<!-- more -->
**UNIQUED**可空，可以在一个表里的一个或多个字段定义；**PRIMARY KEY**不可空不可重复，在一个表里可以定义联合主键；

简单的说，primary key = unique +  not null

unique 就是唯一，当你需要限定你的某个表字段每个值都唯一,没有重复值时使用。比如说,如果你有一个person 表，并且表中有个身份证的column，那么你就可以指定该字段为unique。 从技术的角度来看，Primary Key和Unique Key有很多相似之处。但还是有以下区别：

1. 作为Primary Key的域/域组不能为null，而Unique Key可以。
2. 在一个表中只能有一个Primary Key，而多个Unique Key可以同时存在。
更大的区别在逻辑设计上。Primary Key一般在逻辑设计中用作记录标识，这也是设置Primary Key的本来用意，而Unique Key只是为了保证域/域组的唯一性。

oracle的constraint中有两种约束，都是对列的唯一性限制――unique与primary key，但其中是有区别的：

1. unique key要求列唯一，但不包括null字段，也就是约束的列可以为空且仅要求列中的值除null之外不重复即可；
2. primary key也要求列唯一，同时又限制字段的值不能为null，相当于Primary Key=unique + not null。

创建一个primary key和unique key都会相应的创建一个unique index。

primary key的语法：``alter table table name add constraint key name primary key( columns);``

unique key的语法：``alter table table name add constraint key name unique( columns);``

一个表只能有一个主键，但是可以有好多个UNIQUE，而且UNIQUE可以为NULL值，如员工的电话号码一般就用UNIQUE，因为电话号码肯定是唯一的，但是有的员工可能没有电话。

主键肯定是唯一的，但唯一的不一定是主键；不要把UNIQUE索引和UNIQUE约束混为一谈

1. primary key = unique + not null
2. 唯一约束和主键一样都是约束的范畴，而且都可以作为外键的参考，不同的是，一张表只能有一个主键
3. 主键和唯一约束的创建需要依靠索引，如果在创建主键或唯一约束的时候没有已经建好的索引可以使用的话，Oracle会自动建立一个唯一的索引。
