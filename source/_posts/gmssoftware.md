---
title: 地下水数值模拟软件获取以及相关教程
index_img: 'https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/16213678437069085683738921793155.jpg'
tags:
  - GMS
  - 地下水
  - 数值模拟
categories:
  - 软件
date: 2021-02-06 13:45:55
banner_img:
---

![GMS](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/16213678437069085683738921793155.jpg)

由于毕业论文做T-PROGS与MODFLOW的结合来模拟地下水水流运动的研究，需要学习地下水模拟相关方面的的软件。在这个过程中也走不少的弯路，经过一番折腾，终于在网上找到了一些非常好的入门资料。为了方便之后的有需要的人~~(估计只有我这样的菜鸡才会需要了┭┮﹏┭┮)~~ ，我把我能找的所有资料罗列出来，以便查阅！

<!--more-->

# GMS

关于GMS（Groundwater Modeling System）其实就是一些常见的地下水数值模拟软件的集合体，包括下面会出现的MODFLOW以及一些~~我没有用到的~~其他软件包。该软件由Aquaveo, LLC.发行，国内好像是北水国际公司代理的<div class="heimu"> 啊，这个我不清楚！我乱说的</div>。可以从[Aquaveo](https://www.aquaveo.com/software/gms-groundwater-modeling-system-introduction)的官网上下载到的最新版本（目前是10.5.6），除了免费的Community版本以外好像都还挺贵的。

![GMS](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/20210110170550.png)

为此，几番周折之后我找到了含有破解版的10.4.5版本，将其放到了我的onedrive网盘之中~~可以通过API权限的方式直接通过网页访问~~。

{% note success %}
[点击下载10.4.5版本](https://zfile.tabirstrees.top/directlink/3/%E8%BD%AF%E4%BB%B6/%E5%9C%B0%E4%B8%8B%E6%B0%B4%E6%95%B0%E5%80%BC%E6%A8%A1%E6%8B%9F%E8%BD%AF%E4%BB%B6/GMS/10.4.5/AquaveoGMS.zip)
该版本教程网址为：https://www.aquaveo.com/software/gms-learning-tutorialswww.aquaveo.com 基本上包括了所有的基础软件操作和可以实现的功能教程，也可以在这里找到所有对应的项目资源数据文件。

[点击下载7.1版本（由学长提供）](https://zfile.tabirstrees.top/directlink/3/%E8%BD%AF%E4%BB%B6/%E5%9C%B0%E4%B8%8B%E6%B0%B4%E6%95%B0%E5%80%BC%E6%A8%A1%E6%8B%9F%E8%BD%AF%E4%BB%B6/GMS/GMS.rar)
该版本的教程在安装时可以选择（默认）下载，安装完之后可以在安装目录下的tutorial文件夹中找到，包括了各种项目的数据资源文件。除此之外，学长提供的软件包里面还包括了一份中文翻译之后的软件教程，具体对应的版本还不是很清楚，不过基本都差不多能用，可以作为参考，推荐还是尽量阅读原始的英文教程。
{% endnote %}

有了这些东西之后可以相对快速的入门GMS，不用到处寻找软件教程以及相关书籍。but，这些tutorials都是全英文文档，对于不习惯看英文材料的同学可能不是很友好╮(╯▽╰)╭ 。

# MODFLOW

这一次毕业论文其实主要是使用GMS中的T-PROGS和MODFLOW模块，事实上MODFLOW和T-PROGS都是开源的。T-PROGS由于年代久远似乎已经失传了，关于这部分内容是我毕业论文的主体，之后会单独出一篇学习笔记来详细阐述。

对于MODFLOW来说，商业软件GMS以及Visual MODFLOW等都是可以使用的，但是实际生产问题是千差万别的，没有所谓“通用的软件”可以解决实际上遇到的所有问题，对于科学研究的创新来说更是如此！我们需要学会在原有的代码的基础上添加自己对地下水运移这个过程的深入理解，一定的编程和数学物理能力必不可少，此外我们也不必要自己完全重新写写个软件出来。这可能也是USGS（美国地质调查局 United States Geological Survey）将MODFLOW开源并持续维护更新的原因所在吧。

而MODFLOW目前已经更新到[MODFLOW 6](https://www.usgs.gov/software/modflow-6-usgs-modular-hydrologic-model)
了，该项目也可以在GitHub（[MODFLOW-USGS/modflow6](https://github.com/MODFLOW-USGS/modflow6)）上找到，甚至包括了一些大佬自己修复的一些bug和添加功能。

由于是开源软件，提供的都是Fortran语言的源代码，而USGS也相当~~“贴心”~~地提供了一系列关于如何使用的教程，我全部打包放在了我的云盘里一并提供在此：

{% note success %}
https://zfile.tabirstrees.top/directlink/3/%E8%BD%AF%E4%BB%B6/%E5%9C%B0%E4%B8%8B%E6%B0%B4%E6%95%B0%E5%80%BC%E6%A8%A1%E6%8B%9F%E8%BD%AF%E4%BB%B6/MODFLOW%E5%BC%80%E6%BA%90%E6%96%87%E4%BB%B6.zip
{% endnote %}

# 总结一下嘛

感觉写了一千多字<div class="heimu">可能还没有😂</div>的废话......下次一定整点有用的！
![一张图而已，没什么好看的](http://image.tabirstrees.top/images/2021/02/06/E77C06B943FAD6398EAA3097BE3B80C1.jpg)
