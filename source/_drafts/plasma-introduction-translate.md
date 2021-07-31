---
title: A Short Introduction to Plasma Physics
tags:
- 等离子体物理
- Plasma
- 物理
- 文献翻译
---
{% note primary %}

# 摘要

本文包括了对等离子体现象的某些物理基础的讨论。在第二部分我们介绍了等离子体的关键特性，例如准中性、屏蔽（拜德屏蔽？）、粒子输运过程以及等离子体鞘的形成。在第三部分中我们描述了最简单的等离子体模型：从单粒子轨迹和等离子体流体动力学的基本原理推导出的集体现象（漂移）。最后讨论了均匀无界的冷等离子体的波动现象。

{% endnote %}

---

# 1. 简介

​		等离子体在自然界中以很多种形式存在，并在科技生产中有着广泛的应用。它是有以下几种物质组成的特殊电离气体：
- 带正电荷的离子（正离子）
- 电子
- 中性粒子（原子，分子以及自由基）

（在特殊条件下，等离子体也可能包含负离子，但我们之后不会讨论这种情况，因此之后的离子普遍代表“正离子”。）我们将呈现_准中性_，并且其特性由电磁力控制的电离气体称为“等离子体”。

​		由于自由离子的存在，使用等离子体作为离子源是很自然的事情，对于这种特殊情况，等离子体是通过适当形式的低压气体放电产生的，由此产生的等离子体通常被称作“低温等离子体”。尽管电子可能达到数万卡尔文的高温（比太阳表面的温度更高），而离子和中性气体的或多或少只能算是温暖，但是由于电子的质量很低，无法将它们的热能传递给更重的等离子体部分（离子或者中性气体部分）或者enclosing walls（<span class="heimu"> 这个不知道是什么意思，翻译不出来... </span>）。因此，这种类型的冷等离子体不会向其周围的环境传递太多热量，因此可以更准确地将其描述为“低熵-等离子体”。

# 2. 关键的等离子体性质

## 2.1 粒子密度

​		由于自由运动电荷的存在，等离子体会对电磁场响应，传导电流，并具有明确定义的空间势。

​		正离子可能带有单个电荷或者多个电荷。对于包含单个电荷的离子，离子群可以被离子密度$n_i$充分描述，

$$
n_{\mathrm{i}}=\frac{\text { number of particles(粒子数量) }}{\text { volume(体积) }}, \quad\left[n_{\mathrm{i}}\right]=\mathrm{cm}^{-3} \text { or }\left[n_{\mathrm{i}}\right]=\mathrm{m}^{-3} \text { . }
$$

除了离子密度，我们还可以通过电子密度$n_e$以及中性气体部分的密度$n_a$描述等离子体。

## 2.2 电离度，准中性

​		等离子体的准中性意味着正负电荷的密度（几乎）相等。在单电荷离子的例子中，表示为：

$$
n_{\mathrm{i}} \approx n_{\mathrm{e}}
$$

在多电荷离子的情况下，我们需要修改这个关系式。如果$z$表示正电荷离子的电荷数，$n_z$表示具有z个电荷的离子的密度，电中性的条件表示为：
$$
n_{\mathrm{e}} \approx \sum_{z} z \cdot n_{z}
$$
电离度用粒子密度而不是电荷密度来定义。然而，这里有两种不同的定义来使用：
$$
\eta_{\mathrm{i}}=\frac{\sum_{z} n_{z}}{n_{\mathrm{a}}+\sum_{z} n_{2}} \quad \text { and } \quad \eta_{\mathrm{i}}^{\prime}=\frac{\sum_{z} n_{z}}{n_{\mathrm{a}}}
$$
严格来说，通常情况下$\eta_{\mathrm{i}}^{\prime}$是对$\eta_i <<1$时的$\eta_i$的估计。离子源等离子体$\eta_i$的典型值在$10^{-5}$到$10^{-3}$之间，完全电离的等离子体$\eta_i = 1$（在这种情况下$\eta_i^{\prime} \rightarrow \infty$）。

![电离过程示意](https://file.tabirstrees.top/blogfile/ITP/Charge%20separation%2C%20schematic.jpg)
<center>图一 电荷分离过程示意</center>

为了进一步研究电中性，我们假设等离子体中的电子云移动到了一个确定的区域内，形成了一个负电荷区域。类似的离子云在$L = \delta x$的距离内不存在电子，形成一个正电荷区域（见图一）。因此，我们可以在这些电荷空间的共同边界处得到一个最大值的电场$\overline{E_{max}}$。并且可以通过泊松方程得到这个最大电场的估计值：
$$
E_{\max }=\frac{e \cdot n_{\mathrm{i}} \cdot \delta x}{\varepsilon_{0}}
$$

$E$的的方向取决于电场力使得两团粒子云趋向于相互重叠。这里$e$是基本正电荷，$\varepsilon_0$是真空中的介电常数。

为了进一步讨论，我们计算了带电粒子通过空间电荷层移动$\delta x$后的势能增量（电场力做功）$W_{pot}$：
$$
W_{\mathrm{pot}}=\int_{0}^{\delta x} e E \mathrm{~d} x=\frac{e^{2} n_{\mathrm{e}}(\delta x)^{2}}{2 \varepsilon_{0}}
$$
唯一可以用来为上述电势能提供能量的是电子的热能（当然也有离子，但是因为离子的温度相较于电子较低，离子的热能在低温等离子体（比如离子源等离子体）中可以被忽略），对于一个自由度的运动，其能量平均为 $\frac{1}{2}k_{B}T_{e}$。因此，我们可以认为偏离电中性的尺度由下式定义出来的一个长度指标来表示：
$$
W_{\mathrm{pot}}=\frac{1}{2} k_{\mathrm{B}} T_{\mathrm{e}}
$$
也就是对应我们所谓的**德拜-休克尔（Debye-Hückel）长度**$\lambda_D$：
$$
\lambda_{\mathrm{D}}=\left(\frac{\varepsilon_{0} k_{\mathrm{B}} T_{\mathrm{e}}}{e^{2} n_{\mathrm{e}}}\right)^{1 / 2}
$$
该长度的数值可以由下式给出：$\lambda_{\mathrm{D}} / \mathrm{m}=7.434 \times 10^{3}\left(k_{\mathrm{B}} T_{\mathrm{e}} / \mathrm{eV}\right)^{1 / 2} /\left(n_{\mathrm{e}} / \mathrm{m}^{-3}\right)^{1 / 2}$（见图二）

![不同温度下德拜长度与电子数之间的关系](https://file.tabirstrees.top/blogfile/ITP/Debye%20length%20versus%20plasma%20density%20and%20electron%20temperature.jpg)

<center>图二 不同温度下德拜长度与电子数之间的关系</center>

另一方面，我们可能会问在给定长度$L$上等离子体可能偏离电中性的总量是多少$\Delta n = |n_e-n_i|$。再次强调，我们只有热能是可用的，（热能转化为电势能）因此有：
$$
\frac{1}{2} k_{\mathrm{B}} T_{\mathrm{e}} \approx \frac{1}{2} \frac{e^{2}}{\varepsilon_{0}} \cdot \Delta n \cdot L
$$
利用$k_{\mathrm{B}} T_{\mathrm{e}}$与$\lambda_D$的关系我们可以得到：
$$
\frac{\Delta n}{n} \approx\left(\frac{\lambda_{\mathrm{D}}}{L}\right)^{2}
$$
以此来估计$\Delta n$的大小。

我们可以假设电中性的条件为$\Delta n <<n_{\mathrm{e}} ,n_\mathrm{i}$，根据方程（10）这就等价于$L>>\lambda_{\mathrm{D}}$。这意味着为了满足形成等离子体的条件，电离气体的延伸必须要远大于德拜-休克尔长度，等离子体的电中性被定义在一个宏观尺度上，如果我们从宏观尺度来看等离子体，会发现随着尺度的减小，其偏离电中性的程度逐渐增加。

