---
draft: true
date: 2025-03-12 17:15:44
title: PENCIL 代码自用手册 —— 1
cover: https://image.tabirstrees.top/images/2025/03/12/pencil-code.png
tags: 
- 磁流体力学
- 代码
- 宇宙学
- 天体物理
- 空间物理
categories: 
- [科研, 数值模拟软件教程]
description: 对PENCIL代码的安装和使用做一个简单的总结, 方便后续查看
---

# 代码安装

PENCIL 代码和其他代码不太一样, 因为每次运行需要的模块可能不一致(代码提供了大量的模块可供调用), 所以代码的编译实际上是在对应的 case 中进行编译的. 在这之前你应该确定你所需要的模块, 实际上代码提供了很多示例, 我们只需要找到和我们的目标相近的示例进行修改, 添加自己想要的内容和模块, 修改对应的参数即可.

## 下载

首先, 代码是运行在 Linux 环境下的, 所以你需要准备好对应的系统, 一般而言都是集群环境或者在 WINDOWS 环境下使用 WSL2 进行代码的运行.

在你想要安装代码的位置 `git clone` 一下.

```git
git clone https://github.com/pencil-code/pencil-code.git
```

进入代码所在目录, 配置对应的环境变量.

```bash
source sourceme.sh
```

{% note warning modern %}
需要注意的是, 每次你重新连接集群或者重新打开终端都需要执行一遍上面的配置环境的命令, 或者你也可以在用户主目录下的 `.bashrc` 文件中添加下面的指令:

```bash
# 手动设置 PENCIL_HOME
export PENCIL_HOME=~/file/pencil-code

# 确保 PENCIL_HOME 存在
if [ -d "$PENCIL_HOME" ]; then
    echo "PENCIL_HOME = <$PENCIL_HOME>"
else
    echo "Warning: PENCIL_HOME directory does not exist!"
fi

source ~/file/pencil-code/sourceme.sh
```

这样每次打开终端就可以自动将代码目录添加到环境变量之中, 避免有时候忘记这一步操作导致的问题.
{% endnote %}

这样一下基本上就算是安装好代码了, 接下来就是直接对代码进行编译和使用.

## 编译

在你确定好自己的研究目标之后, 可以到代码安装目录下找到 `samples` 文件夹, 进入之中找一个和自己模拟的情况最为接近的案例.

```bash
cd $PENCIL_HOME/samples/
```

这里我们选择 `helical-MHDturb` 这个案例, 将整个文件夹复制到你的工作目录, 比如:

```bash
cp helical-MHDturb ~/workspace/pencil_test/
cd ~/workspace/pencil_test/helical-MHDturb
ls
```

你会得到如下的输出:

<img src="https://image.tabirstrees.top/images/2025/03/12/20250312201951644.png" width="650">

这里可以看到已经有一些结果在, 因为这是示例文件. 我们只关心 `.in` 后缀的文件和 `src` 文件夹即可, `.in` 是程序的输入参数文件, 而 `src` 目录下放着我们需要编译的模块信息. 这里我们先进入这个文件夹, 此时会有两个文件: `cparam.local` 和 `Makefile.local`

`Makefile.local` 中包含了模块信息, 也就是你需要编译的模块. 关于各个模块的详细信息这里就不作详细介绍, 需要注意的是其中一行 `MPICOMM = nompicomm` 设置了关于 MPI 也就是并行计算的配置, 如果你只需要一个核进行串行计算, 就设置成图中的 `nompicomm` 即可, 如果是需要用到多个核的并行计算则设置成 `mpicomm`.

<img src="https://image.tabirstrees.top/images/2025/03/12/20250312204844806.png" width="450">

另一个文件则是详细地设置核的数量以及网格数量的地方, 这个例子中表明使用单个核, 网格为 32*32*32, 并且在其中放置 30000 个粒子, 追踪其轨迹(<span class='mohu'>1000步? particle_stalk的东西还没看, 还不是特别清楚相关的设置.</span>)

<img src="https://image.tabirstrees.top/images/2025/03/12/20250312205444733.png"/>

{% note warning modern %}
每一次修改这两个文件之后都需要重新进行编译, 否则运行的时候将可能会出现错误!
{% endnote %}

修改好文件之后, 就可以开始编译了, 如果是单核任务就直接 `pc_build -f GNU-GCC`, 如果是多核并行任务就 `pc_build -f GNU-GCC_MPI`. 注意不同的编译器之间的问题, 这里推荐使用 GCC 的 make 编译套件就行.

{% note info modern %}
有时候集群上的登陆节点不允许执行编译任务, 所以需要用提交脚本的方式进行编译. 这里用上交的 SiYuan 集群的 slurm 系统作为案例, 编译的任务脚本可以这样写:

```bash
#!/bin/bash
#SBATCH --partition=64c512g
#SBATCH --job-name=Compile
#SBATCH -n 1
####SBATCH --ntasks-per-node=64
#SBATCH -o %j.out
#SBATCH -e %j.err

ulimit -s unlimited
ulimit -l unlimited

module purge
module load openmpi/4.1.1-gcc-11.2.0 gcc/11.2.0

# pc_build -f GNU-GCC_MPI
pc_build -t read_all_videofiles -f GNU-GCC_MPI
```

其中 `-t read_all_videofiles` 指在编译过程中同时也编译后处理程序 `read_all_videofiles.x`, 该程序是将原本保存在不同文件夹中的不同计算单元的计算结果(主要是模拟空间的切片文件)整合到一起.
{% endnote %}

{% note warning modern %}
另外需要注意的是编译的位置, 也就是提交命令或者脚本的目录应该是模拟的输入文件(`run.in` `start.in` 等)所在的目录, 而不是 `Makefile` 文件所在的目录.
{% endnote %}

如果过程没有报错, 编译完之后模拟目录以及 `src` 文件夹下将会出现一些编译好的可执行文件. 这一步之后就可以开始修改输入参数, 运行程序了.

# 程序运行

这里我们不修改示例文件的参数, 直接开始执行, 使用 `pc_run` 命令即可. 在 SiYuan 集群上, 我们采用如下的脚本提交任务:

```bash
#!/bin/bash
#SBATCH --partition=64c512g
#SBATCH --job-name=pencil
#SBATCH -n 1024
#SBATCH --ntasks-per-node=64
#SBATCH -o %j.out
#SBATCH -e %j.err

ulimit -s unlimited
ulimit -l unlimited

module purge
module load openmpi/4.1.1-gcc-11.2.0 gcc/11.2.0

pc_run
```