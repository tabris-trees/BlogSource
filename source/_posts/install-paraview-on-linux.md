---
date: 2025-10-19 15:57:18
title: 在Linux集群上安装配置并行版本 Paraview
cover:
tags:
- paraview
- 集群
- 服务端
categories:
- [工作, 工具配置, 绘图工具]
description:
---

## 写在前面

最近希望可以画出某个物理量的三维空间结构, 一开始使用`MATLAB`效果也还不错, 但是由于笔记本内存小所以没办法使用过于精细的网格,导致出来的图片分辨率惨不忍睹. 

<img src="https://image.tabirstrees.top/images/2025/10/19/20251019162219285.png" width="400">

因此希望可以借助专业级别画图软件的渲染能力来把图变得好看点. 然而当我使用`paraview`软件时却发现但凡超过一百兆的文件都会直接卡死, 简单了解一下是因为`paraview`使用CPU进行渲染, 卡死多半和CPU的性能有关. 正因为如此, `paraview`提供了`MPI`并行版本. 为了使用这个并行版本, 我打算将其安装在我们组内的集群上. 由于没有管理员权限以及需要在本地访问集群的服务, 因此有很多坑需要踩, 这里将安装流程记录下来, 提供一个无痛安装、使用的教程.

## 安装程序

这一步很简单, 因为官方提供的程序属于是便携版的程序, 解压就能直接用, 内部包含了全部的依赖.

{% note warning %}
但是需要注意的是集群上没有桌面环境, 因为我需要选择"ParaView Server for Headless Machines"内的版本, 一般来说应该选在带有`osmesa`字样的版本, 也就是利用CPU进行渲染的版本, 如果你希望通过GPU进行渲染就选在带有`egl`字样的版本.

这里我选择的是: ParaView-5.13.0-osmesa-MPI-Linux-Python3.10-x86_64.tar.gz, 右键对应版本获取其文件的下载链接(或者也可以直接下载到本地再上传到服务器): "https://www.paraview.org/paraview-downloads/download.php?submit=Download&version=v5.13&type=binary&os=Linux&downloadFile=ParaView-5.13.1-osmesa-MPI-Linux-Python3.10-x86_64.tar.gz"

{% endnote %}

集群上下载对应的安装包:

```bash
wget "https://www.paraview.org/paraview-downloads/download.php?submit=Download&version=v5.13&type=binary&os=Linux&downloadFile=ParaView-5.13.1-osmesa-MPI-Linux-Python3.10-x86_64.tar.gz" -O ParaView-5.13.1-osmesa-MPI-Linux-Python3.10-x86_64.tar.gz
```

对压缩包进行解压缩:

```bash
tar -zxvf ParaView-5.13.1-osmesa-MPI-Linux-Python3.10-x86_64.tar.gz -C ~/software/paraview5.13.1-osmesa
```

这里因为我没有管理员权限, 所以安装到我自己的目录(最好所有的软件都安装到同一目录方便管理).

实际上到这一步, `paraview`的安装就算是完成了, 但是要在集群环境, 尤其是在带有任务系统的集群环境使用`paraview`还需要一系列的配置.

## 使用程序

我这边的集群使用slurm系统, 因此我这边使用slurm脚本来进行演示, 对于其他的任务系统实际上换汤不换药. 选择一个文件夹(我这里是`~/scripts`, 放着我自定义的全局使用的脚本)创建一个slurm脚本:

```bash
#!/bin/bash
#SBATCH --job-name=pvserver
#SBATCH --partition=debug
#SBATCH --nodes=1                   # 使用 1 个节点（可改）
#SBATCH --ntasks=8                  # 总进程数（和 mpiexec -n 对应）
#SBATCH --time=01:00:00             # 作业最长运行时间
#SBATCH --output=/home/xianshu/cache/out_pvserver.out
#SBATCH --error=/home/xianshu/cache/err_pvserver.err

### 可选: 指定节点
### #SBATCH --nodelist=node03
### #SBATCH --exclude=node06

# -----------------------------------------------------------------------------
# 用户配置区
# -----------------------------------------------------------------------------
PARA=$HOME/software/paraview5.13.1-osmesa      # ParaView 安装路径
PORT=11111                           # pvserver 通信端口
NP=$SLURM_NTASKS                     # 自动读取任务数
# -----------------------------------------------------------------------------

echo "==== ParaView MPI job started on $SLURM_JOB_NODELIST ===="
echo "Date: $(date)"
echo "Running on $SLURM_NTASKS tasks across $SLURM_JOB_NUM_NODES node(s)"
echo "ParaView path: $PARA"

# 添加 ParaView 的可执行路径
#export PATH="$PARA/bin:$PATH"
#export LD_LIBRARY_PATH="$PARA/lib:$LD_LIBRARY_PATH"

# -----------------------------------------------------------------------------
# 启动 pvserver
# -----------------------------------------------------------------------------
# 建议使用包内自带的 mpiexec（MPICH 实现）
"$PARA/bin/mpiexec" -n "$NP" "$PARA/bin/pvserver" \
    --server-port=$PORT \
    --force-offscreen-rendering \
    --disable-xdisplay-test

env -u DISPLAY \
# -----------------------------------------------------------------------------
echo "==== ParaView job finished at $(date) ===="
```

其中`PARA`是你安装`paraview`的目录(<span style='color: #E63F32'>基本上是除了slurm设置区域外唯一需要更改的地方</span>), `PORT`是你希望指定的服务器端口, 一般来说可以不用更改.

这里

```bash
#SBATCH --output=/home/xianshu/cache/out_pvserver.out
#SBATCH --error=/home/xianshu/cache/err_pvserver.err
```

输出文件的路径需要改成你自己想要存放的位置. 但是为了和本地的客户端配合, 建议选一个固定的位置, 我这里是专门存放需要建立 ssh 隧道访问服务端端口文件的位置.

此时就已经可以使用`sbatch script_paraview`提交任务执行`paraview`程序了. 为了能够随时随地不需要将脚本保存到当前目录就能运行, 可以把这句命令写进一个全局脚本中. 在我的机器上是`~/scripts/paraviewrun`, 之后只需要将`~/scripts`加入到环境变量中即可:

```bash
export PATH=$PATH:$HOME/scripts
```

比如我这里直接在任何目录运行`paraviewrun`, 就能快速提交一个`paraview`的多核心任务. 此时在之前指定的输出文件中有:

```log
==== ParaView MPI job started on node01 ====
Date: 2025年 10月 19日 星期日 16:52:35 CST
Running on 8 tasks across 1 node(s)
ParaView path: /home/xianshu/software/paraview5.13.1-osmesa
Waiting for client...
Connection URL: cs://node01:11111
Accepting connection(s): node01:11111
```

就说明程序正常启动了, 接下来只需要在本地建立 ssh 链接, 将服务器端口转发到本地的端口就能在本地的`paraview`中连接服务端使用了.

## 本地连接

在`paraview`程序中进行本地连接之前需要建立ssh通道:

```powershell
ssh -L 11111:node01:11111 username@cluster.example
```

{% note warning %}
这里的 `node01` 也要换成你输出文件中给出节点(实际上就是`cs://`后面的内容), 不然是连接不上的.
{% endnote %}

之后打开`paraview`程序, 在`File > Connect`中配置好服务端信息, 之后点击连接即可.

<img src="https://image.tabirstrees.top/images/2025/10/19/20251019211825659.png" width = 450/>

到此, 整个服务器端并行版本`paraview`的安装就结束了. 实测渲染的速度确实要比我本地的垃圾电脑快不少, 也算是没有白费辛苦.