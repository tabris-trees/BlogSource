---
date: 2023-11-08 17:07:07
title: TRANSP 软件使用学习
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/transp-20231108171843.png
tags: 
- 聚变
- 离子回旋加热
- NBI
- 数值模拟
- 程序
categories: [科研, 等离子体物理, 模拟]
description: TRANSP 是美国普林斯顿大学等离子体物理实验室（PPPL）开发的一款为了进行托卡马克实验数据分析的程序.
---

# TRANSP 软件使用学习

## 关于 TRANSP 软件的简单介绍

[TRANSP](https://transp.pppl.gov/) 是美国普林斯顿大学等离子体物理实验室（PPPL）开发的一款为了进行托卡马克实验数据分析的程序，是目前世界范围内应用最广泛的托卡马克实验数据分析程序之一。能够进行托卡马克非圆截面磁位型下 1½ 维度的输运与约束分析，以及托卡马克数据的诊断模拟。(这一段就是到处抄来的，反正大差不差，主要就是用来干这些事情的，不了解的人估计也不会用到这些软件)。

<span style='background: yellow'>值得一提的是，本文是根据运行在等离子体所的集群 SHENMA 服务器上的 TRANSP 软件进行学习的，所以有可能并不适用所有的情况。</span>

## 使用准备

在开始使用 TRANSP 软件之前需要准备软件所需的数据文件，因为这个软件开发的时候使用名为 `ufile` 的文件格式，这里我们可能需要用到一个名为 `ufileGen` 以及 `scrunch2` 的小程序来完成文件的准备工作。为了能够将这个软件完整地运行起来，至少需要用到的数据包括 ip, vloop, R*Bt 以及 ne, te, ti 等，其中前面三种为一维数据，后面三种为二维数据，另外还需要磁场位形数据，一般是 `gfile` 文件。

### 一维或者二维数据文件

首先需要准备一个 `.txt` 格式的文本文件（实际上格式应该也不重要，只要是文本文件就可以，比如说 `.dat` 文件）。文件内容应该按照以下的格式存放数据：

- 第一行为时间点
- 第二行开始为正式数据，其中第一列是数据的径向坐标位置，然后是对应时间点，坐标点上的物理量数据
- 要求时间跨度合适（将软件计算的时间包括在内），采样率合适
- 如果是一维数据则直接第一列时间点，第二列为时间对应的物理量数据

<center><img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/transp-fig1.png" width="600" /></center><center id='f1'><span style='font-weight:bold'>Fig 1. 数据文件示例，左边为二维数据电子密度，右边为一维数据大半径乘上环向磁通。</span></center>

具体的操作可以参考下面的 gif 图片：

<center><img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/transp-fig2.gif" alt="transp-fig2"></center><center id='f2'><span style='font-weight:bold'>Fig 2. 操作示例，以电子密度为例。</span></center>

最后得到的数据文件 `ufile` 格式为：

<center><img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/transp-fig3.png" alt="transp-fig3"></center><center id='f3'><span style='font-weight:bold'>Fig 3. 执行操作后的 ufile 文件内容如图</span></center>

### 磁场位型数据

一般来说我们用的最多的是 `gfile` 类型的磁场位形数据，因此需要用到名为 `scrunch2` 的程序进行格式转换。将所需要的磁场位形数据拷贝到目录中，并建立一个名为 `index.dat` 的只是文件，给程序指示不同时间点的磁场位形文件是哪一个（以及文件储存的路径！！！），如下图所示：

<center><img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/transp-fig4.png" alt="transp-fig4"></center><center id='f4'><span style='font-weight:bold'>Fig 4. index.dat 文件的示例。</span></center>

> 值得注意的是配置运行 TRANSP 软件的步骤需要在名为 `Singularity` 的容器中进行，而我们需要准备的 `ufile` 文件中，一二维数据文件可以直接在容器外面用相关的小程序直接进行，但是平衡文件的转化程序 `scrunch2` 需要进入到容器中之后才能使用。

### 配置环境变量

为了能够顺利的进入容器，这里需要对我们神马集群上的账号进行环境变量的配置，在 home 目录下打开 `.bashrc` 文件，将其中的内容改为：
```shell
# .bashrc
# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi

# User specific aliases and functions
#######module for transp singularity container
export SINGULARITY_TMPDIR=/scratch/users/transp/tmp
ulimit -l unlimited
ulimit -s unlimited
```
其中 `users` 记得换成自己的账号名。这个意思是将 `singularity` 的临时文件保存到有自己可操作权限的文件夹中。

---

进行完上述操作后，进入我们存放数据的文件夹中，在神马上有一个专门用于存放 TRANSP 运行文件的文件夹，我这边的示例为：`/gpfs/scratch/lijc/transp/Runs/EAST/11473`，`lijc` 对应你自己的账号名，`Runs` 中存放需要运行的数据，实际上上文存放临时文件的位置也是在和 `Runs` 并列的 `tmp` 文件夹中。数据应该尽量按照装置和炮号放置在不同目录下。

## 配置并进入容器

首先切换到 110 节点，<span class='mohu'>实测不切换的话是进入不了容器的，会提示找不到文件的位置</span>。
```shell
ssh login110
```
然后进入存放数据的文件夹，加载需要使用的 modules 并进入容器配置：
```shell
cd /gpfs/scratch/users/transp/Runs/XXXX/XXXXX
module use /gpfs/fuyun/modules/all
module load singularity/3.8.1-Go-1.14.1
singularity run --app environ /gpfs/fuyun/containers/singularity/transp_21.2.sif
```
这里 singularity 也可以使用 21.4 版本的 TRANSP ，但是这个版本的 `scrunch2` 工具不知道为什么使用不了所以推荐 21.2 版本。进入容器后会让你进行交互，通过以下的配置（我自己的例子）可以生成一个执行程序的环境配置文件 `transp-bashrc` ：
```log
[lijc@login110 11473]$ singularity run --app environ /gpfs/fuyun/containers/singularity/transp_21.2.sif
INFO:    Converting SIF file to temporary sandbox...
Singularity container for TRANSP v21.2.
app: environ
Enter RESULTDIR path: /scratch/transp/result/lijc/
Enter DATADIR path: /scratch/lijc/transp/data
Enter TMPDIR path: /scratch/lijc/transp/tmp
Use standard ADAS table [y/n]? n
Enter ADAS path: /opt/adas
Use standard PREACT table [y/n]? n
Enter PREACT path: /opt/preact
Set NPROCS: 8
Set NBI_NPROCS: 8
Set NTOR_NPROCS: 0
Set NPTR_NPROCS: 0
Set NGEN_NPROCS: 0
Set NCQL3D_NPROCS: 0
Finished configuring TRANSP environment.
INFO:    Cleaning up image...
ERROR:   failed to delete container image tempDir /scratch/lijc/transp/tmp/rootfs-689595348: unlinkat /scratch/lijc/transp/tmp/rootfs-689595348/root/root/.tcshrc: permission denied
[lijc@login110 11473]$
```
下面那个 ERROR 可以不用管，不影响使用。

随后将这个环境配置文件以当前目录并进入容器内部：
```shell
mv ~/transp-bashrc .
singularity run   -B `pwd`:`pwd` -B /opt/tsce4/:/opt/tsce4  -B /project/transp/public/transp/codesys/pbs:/opt/transp/codesys/pbs -B  /scratch/users/transp:/scratch/users/transp -B /scratch/transp/result:/scratch/transp/result /gpfs/fuyun/containers/singularity/transp_21.2.sif
```
记得将 `users` 改成自己的用户名。此时，如果还没有转换过平衡文件需要用 `scrunch2` 转化平衡文件。

<center><img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/transp-fig5.gif" alt="transp-fig5"></center><center id='f5'><span style='font-weight:bold'>Fig 5. scrunch2 工具的使用示例。</span></center>

打开准备好的 namelist 文件（ xxxxxTR.DAT ），修改选项，注意文件和数据的路径（一般来说是第二行，不排除有其他指定的位置）要修改到自己的路径，因为一般是拷贝的别人的 namelist 文件，很多地方都需要修改，注意不要遗漏。准备好之后开始在容器内打包可执行文件：
```shell
source transp-bashrc # 使环境配置生效
pretr MPI XXXXXXXX # 确认炮号，检查文件
trdat XXXXXXXX # 生成统一的物理量文件
w
q
label XXXXXXXX # 建立连接
copy_expert_for XXXXXXXX
uplink XXXXXXXXtr nolib # 生成可执行文件
exit
```
最后将 `transp-exec.sh` 文件中的炮号改成自己使用的炮号，再提交 `transp-qsub-once.psb` 文件的任务就可以执行 TRANSP 软件了。
```shell
qsub transp-qsub-once.psb
qstat
```

## 参考

1. https://slideum.com/doc/176845/transp%E5%8F%91%E5%B8%83%E4%BC%9A---%E9%AB%98%E6%80%A7%E8%83%BD%E8%AE%A1%E7%AE%97%E9%9B%86%E7%BE%A4%E2%80%9C%E7%A5%9E%E9%A9%AC%E2%80%9D-%E2%80%94-%E7%AD%89%E7%A6%BB%E5%AD%90%E4%BD%93%E6%89%80
2. https://transp.pppl.gov/