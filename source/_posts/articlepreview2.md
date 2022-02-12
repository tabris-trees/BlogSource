---
title: 等离子体物理近期期刊文章摘要速读2
tags:
  - 论文摘要
  - 空间物理
  - 等离子体
  - JGR
  - Arxiv
date: 2022-02-08 11:33:09
index_img: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/plasma.jpg
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/plasma.jpg
categories: [期刊导读,摘要速读]
description: 对自己在feedly上看到的一些感兴趣的文章的摘要翻译一下，方便日后查看并了解一下领域内（包括 `等离子体物理`、`太阳物理`、`空间物理`以及`等离子体天体物理`方面的研究 ）的一些最新动态。
math: true
---

![plasma](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/plasma.jpg)

# 导读🍇

{% note primary %}

最近一直在用<span style='background: yellow'>Feedly</span>看研究领域相关的论文，并且关注的国家天文台的某位博士师兄在自己的公众号上推出了<b>太阳物理Arxiv速读</b>系列文章，感觉还比较有意思，自己也想尝试一下，于是有了这一期的博客，想要对自己在feedly上看到的一些感兴趣的文章的摘要翻译一下，方便日后查看并了解一下领域内（包括 `等离子体物理`、`太阳物理`、`空间物理`以及`等离子体天体物理`方面的研究 ）的一些最新动态。<span class='mohu'>鉴于水平有限，很多地方没办法完全翻译（理解）准确，需要多加学习精进才行。</span>

{% endnote %}

---

# Arxiv 🍓

## 1. The Super-Alfvenic Rotational Instability in accretion disks about black holes

>[The Super-Alfvenic Rotational Instability in accretion disks about black holes](https://arxiv.org/abs/2201.11551) —— Hans Goedbloed, Rony Keppens

关于黑洞，中子星或者原行星等吸积盘不稳定性的理论通过最近 *Spectral Web* 的方法被重新审视，圆柱形的吸积盘微分方程是由前向和后向多普勒移动的连续阿尔芬谱方程 $\Omega^{\pm}\_{A} \equiv m\Omega \pm \omega\_{A} $ 所支配的，其中， $\omega\_A$表示统计的阿尔芬频率。至关重要的一点是考虑非轴对称 $(m \neq 0)$ 以及多普勒框架(<span style='background: pink'>Doppler frames</span>)超级阿尔芬旋转（转动）(<span style='background: pink'>rotation</span>) $(|m\Omega| \gg |\omega\_A|)$ 。连续体具有$\Omega^{+}\_{A}$以及$\Omega^{-}\_A$的回旋频率，从而不同的连续体之间重叠，激发出 <span style='background: yellow'>超级阿尔芬回旋不稳定性</span> (**SARIs**)。对小规模不均匀性的进一步分析表明：两个阿尔芬奇点(<span style='background: pink'>singularities</span>)使得不稳定性的模缩小到远小于吸积盘宽度的范围内。大尺度非均匀性的产生将导致完全出乎意料的结果，也就是波数 $|k| \gg |m|$，在一个实轴上的宽的邻域内任何复数形式的 $\omega$ 都是一个近似的“特（本）征值”。其与本征模之间的差异在于其激发模的互补(<span style='background: pink'>complementary</span>)能量很小，$W\_{com} \leq c$，$c$是计算的机器精度。这就产生了大量二维连续体的准离散模：*准连续 SARIs* 。我们推测，磁化吸积盘中三维湍流的发生不是由离散轴对称磁旋转不稳定性的激发控制的，而是由这些二维准离散非轴对称连续体的超阿尔芬回旋不稳定性模式的激发控制的。

![论文图选1](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/20220206174416.png)

## 2. Wakefield Acceleration in a Jet from a Neutrino Driven Accretion Flow around a Black Hole

> [Wakefield Acceleration in a Jet from a Neutrino Driven Accretion Flow around a
Black Hole](https://arxiv.org/abs/2201.11755) —— Yoshiaki Kato, Toshikazu Ebisuzaki, Toshiki Tajima

我们研究了黑洞周围中微子驱动吸积流（NDAF）产生的喷流中的电磁脉冲。NDAFs是恒星级黑洞产生的吸积速率为$M \approx 0.01-10M_{\bigodot} \rm{/s}$的大质量吸积盘。这种极端的吸积可能会在活动星系核和微型类星体中产生类似磁驱动射流的相对论平行喷流物质。当我们考虑束缚在 NDAF 内区的强环形磁场和喷流上的磁脉冲时，我们发现它们导致了 γ 射线爆发和高能宇宙射线爆发的高能量发射。当阿尔芬波脉冲是由不定期巨型吸积产生的时候，它将会沿着喷流中的大尺度结构的磁场传播。一旦阿尔芬脉冲在低密度条件下达到接近光速的程度，将会转变成电磁脉冲并在其后面产生等离子体尾流，这些尾迹产生的集体加速力与粒子的运动同步。因此， 尾迹加速假设了各种观测信号，比如加速电子产生的高能伽马射线的脉冲爆发，加速质子产生的的中微子脉冲，以及能量最大值超过 $10^{20} \rm{eV}$ 的质子。

![论文图选2](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/20220206234022.png)

---

# JGR Space Physics 🍎

## 3. An Energy Conserving Vlasov Solver That Tolerates Coarse Velocity Space Resolutions: Simulation of MMS Reconnection Events

> [An Energy Conserving Vlasov Solver That Tolerates Coarse Velocity Space Resolutions: Simulation of MMS Reconnection Events](https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2021JA029976?af=R) —— F. Allmann-Rahn,S. Lautenbach,R. Grauer

在相空间网格上运行伏拉索夫求解器（Vlasov Solvers）是非常高精度但对数值计算的要求很高。在PIC（particle in cell）模拟技术当中粗略的速度空间分辨率无伤大雅，但是在连续Vlasov方法中粗略的速度空间分辨率将会导致数值计算误差造成的加热与振荡。为了讨论这个问题，我们呈现了一种新的**二重Vlasov求解器** <span class='mohu'>由两部分组成</span> ，它是在已经建立的进行分布函数更新的<span style='background: pink'>保正平流方案</span>(positivity preserving advection scheme)以及对平均速度和温度进行动力学更新的一种可以保持能量守恒的偏微分方程求解器的基础上建立起来的。这两部分的求解器通过 <span style='background: pink'>动量拟合</span> (moment fitting)共同工作，在此过程中，分布函数的最大熵部分被上述偏微分方程求解器的解代替。这个数值方案使得连续Vlasov方法在计算成本方面与PIC方法相比也有一较高下的资本，同时也使我们能够用完全的动理论方法来模拟地球磁层中的大尺度磁重联。模拟的结果与MMS探测器飞船的实地测量能够能够很好的吻合。

![论文图选3](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/20220207182330.png)

## 4. Electron resonant interaction with whistler waves around foreshock transients and the bow shock behind the terminator

> [Electron resonant interaction with whistler waves around foreshock transients and the bow shock behind the terminator](https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2021JA029820?af=R) —— A. V. Artemyev,X. Shi,T. Z. Liu,X.-J. Zhang,I. Vasko,V. Angelopoulos

对地球弓激波位置及其周围处的电子能量化过程的研究对我们理解空间天气和天体物理现象是十分重要的。这种能量激发的传统绝热机制在这里与瞬态波粒相互作用互相抗衡，其中一种可以与电子发生共振作用的强烈波模是高频哨声波模， 其在地球弓激波附近可以被广泛地观测到。这里我们在经常可以在弓激波或者前激波瞬变附近发现的强磁场梯度的背景下研究这些相互作用。使用 **THEMIS**和**ARTEMIS**对该种波的观测资料，我们量化了在 $\geq 100 \rm{eV}$ 电子和强相干哨声波之间的共振相互作用的非线性效应。这种非线性相互作用包括电子相位被波捕获。因此，被捕获的电子获得能量从而达到几百个 $\rm{eV}$ 的量级。我们估计了文中推荐的加速机制的主要特性并讨论了其在现实等离子体和磁场分布中的适用性。

![论文选图4](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/20220207234343.png)

## 5. A theoretical framework of chorus wave excitation

> [A theoretical framework of chorus wave excitation](https://agupubs.onlinelibrary.wiley.com/doi/10.1029/2021JA029760?af=R) —— F. Zonca,X. Tao,L. Chen

我们提出了一种自洽的合声波激发的理论框架，用来描述哨声波涨落谱的演化以及超热电子分布函数。将重正态化的热电子响应转化为 <span style='background: pink'>类戴森方程</span> (Dyson-like equation)，从而得到非线性涨落增长和频移的演化方程。这种方法允许我们第一次从分析中推导出与最初由 Vomvoridis 等人（1982）提出的 <span style='background: pink'>合声啁啾率</span> (chorus chirping rate)完全相同的表达。 <span style='background: pink'>合声啁啾</span> (Chorus chirping)对应了波粒能量交换的最大化，其中每一个属于哨声波 <span style='background: pink'>集合</span> (packet)的单只波具有小的非线性频移特征。我们还表明，在现有的理论框架中，已发表的文献对合声啁啾的不同解释具有一致的调和性，这进一步说明了自由电子激光物理和聚变等离子物理之间相近现象的类似。

![论文图选5](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/20220208113010.png)