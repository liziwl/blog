---
title: git-解决fork仓库和源仓库同步问题
date: 2018-05-02 19:08:39
categories:
- git
---
项目 fetch 到本地，通过命令行的方式 merge
提示：跟上游仓库同步代码之前，必须配置过 remote，指向[上游仓库](https://help.github.com/articles/configuring-a-remote-for-a-fork/)。

<!-- more -->

```bash
git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
```
## 合并仓库

1. 打开命令行工具
2. 切换当前工作路径至你的本地工程
3. 从上游仓库获取(fetch)到分支，及相关的提交信息，它们将被保存在本地的 `upstream/master` 分支 ```bash
git fetch upstream
# remote: Counting objects: 75, done.
# remote: Compressing objects: 100% (53/53), done.
# remote: Total 62 (delta 27), reused 44 (delta 9)
# Unpacking objects: 100% (62/62), done.
# From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
#  * [new branch]      master     -> upstream/master
```

4. 切换到本地的 `master` 分支 ```bash
git checkout master
# Switched to branch 'master'
```

5. 把 `upstream/master` 分支合并到本地的 `master` 分支，本地的 `master` 分支便跟上游仓库保持同步了，并且没有丢失你本地的修改。 ```bash
git merge upstream/master
# Updating a422352..5fdff0f
# Fast-forward
#  README                    |    9 -------
#  README.md                 |    7 ++++++
#  2 files changed, 7 insertions(+), 9 deletions(-)
#  delete mode 100644 README
#  create mode 100644 README.md
```

提示：同步后的代码仅仅是保存在本地仓库，记得 `push` 到 Github 哟。