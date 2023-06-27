---
date: 2023-06-27 21:54:09
title: CPP-PPPL 暑期学校课程 1 计算等离子体物理简介
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/CPP-PPPL1-20230627221336.png
tags:
- 等离子体
- 计算等离子体物理
- 计算方法
- 计算机模拟
categories: [笔记, 等离子体物理, 计算等离子体物理]
description: 这是对2021年 PPPL(Princeton Plasma Physics Laboratory) 暑期学校教授等离子体计算方法的课件进行学习整理之后的笔记.
---

{% note info %}
这是对2021年 PPPL(Princeton Plasma Physics Laboratory) 暑期学校教授等离子体计算方法的课件进行学习整理之后的笔记.
{% endnote %}

>These are notes, lecture slides and code for use in PPPL’s Graduate Summer School, Computational Methods in Plasma Physics mini-course. All material is copyrighted by Ammar Hakim and released under the Creative Commons CC BY License.

<center><h1>计算等离子体物理简介</h1></center>

动理学作为从微观层面出发解释宏观效应的理论是等离子体物理一个非常有用但复杂的工具, 即使考虑最简单的 Vlasvo-Maxwell 方程也足够描述相当大部分的物理现象.

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial f_{s}}{\partial t} + \nabla_{x} \cdot \left(v f_{s}\right) + \nabla_{v} \cdot \left(\mathbfit{F}_{s} f_{s}\right) = \left(\frac{\partial f_{s}}{\partial t}\right)_{c}
    \end{aligned}
\end{equation}
$$

其中, $\mathbfit{F}_{s} = q_{s}/m_{s} (\mathbfit{E} + v \times \mathbfit{B})$, 再加上描述电磁场的 Maxwellian 方程:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial \mathbfit{B}}{\partial t}+\nabla \times \mathbfit{E} & =0 \\ \epsilon_{0} \mu_{0} \frac{\partial \mathbfit{E}}{\partial t}-\nabla \times \mathbfit{B} & =-\mu_{0} \sum_{s} q_{s} \int_{-\infty}^{\infty} {v} f_{s} \mathrm{\,d} {v}^{3}
    \end{aligned}
\end{equation}
$$

这是一个高度非线性的方程组, 场决定了粒子的运动, 粒子的运动反过来产生新的电磁场. 我们做了很多努力来对这个方程组进行精确约化或者在某些特定情况下求解解析值. <span class='mohu'>中科院数学与系统科学研究所的学术报告中就有很多是关于该方程求解的工作.</span>

那么, 为什么求解 Vlasov-Maxwell 方程如此困难:
- 场和粒子之间的高阶非线性耦合, 以及不同粒子之间通过长程力作用的小角度碰撞;
- 多维相空间的参数以及大质量比(电子和离子的质量比为 $m_{e}/m_{p} \approx 1/1836$)的大量粒子种类(会导致计算精度丢失);
- 从光速到电子等离子体振荡, 从电子回旋到离子回旋, 从介观的流体演化到宏观的平衡态演化, 方程中各种时间和空间上的尺度相差14个数量级.

我们这么关心这些方程的数值求解主要是理论上对未知保持好奇, 另外更加重要的是应用上包括磁约束聚变, 等温等离子体等工程应用时求解方程的需要:
- 应用数学和理论物理要求我们开发更加高效的数值方案来求解描述自然的各种复杂方程;
- 数值方法学科本身的发展, 包括数值能够多大程度的还原物理或者多大程序的利用计算机, 以及研究一些更加先进的数值算法(保结构算法);
- 更深入的理解描述世界的方程, 更深入的理解世界.

<span class='mohu'>比较大, 比较空, 但确实是驱动我们科学技术发展的深层次动机.</span>

- 计算机提供给了我们一个好的工具理解/设计实验和观测, 我们要利用好这项技术;
- 大规模的数值计算预实验需要在实际操作之前确定出一条准确可行的方案(避免大型装置实验失败的巨大风险, 生命财产多方面的).

课件的目的(当然也是本文章的目的)是介绍一下现代等离子体计算的概念, 尤其是建立起方程中**连续(解析)**和**离散(数值)**性质之间的连接. 主要是以下的两个方面:
1. <span style='background: yellow'>说明必须要包含在离散的数值系统当中的物理, 包括不那么直接的性质, 高精确度以及方案求解的阶数;</span>
2. <span style='background: yellow'>对求解方案的动理学方程, PIC(Particle in Cell)以及 Vlasov 方程的连续解的一个总体概览</span>

{% note warnning %}
下面就是课件的主题内容, 因为是课件的笔记, 所以将仅仅只是简单精要的总结, 不会有更多的理解, 后面可能会有一个全局的总结来谈谈我学习完之后的一些理解, 这样也能做的更加深入一些.
{% endnote %}

## 离散方程所包含的物理

>One view of computational physics: we are studying the physics of discretized equations and not really “Nature” itself. Not obvious that these are the same (as measure by some metric).

很多的物理性质是不那么明显的(indirect), 最简单的例子:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial f}{\partial t} + \frac{\partial f}{\partial x} = 0
    \end{aligned}
\end{equation}
$$

{% note info %}
这是没有外加电磁场, 没有碰撞项, 没有初始速度的经过简化版的一维 Vlasov 方程, 实际上它描述了静态平衡(分布是守恒的)
{% endnote %}

从这个式子我们可以推出其 $L_{2}$ 范数是守恒的, 也就是:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial}{\partial t} \frac{1}{2} f^{2} + \frac{\partial }{\partial x} \frac{1}{2} f^{2} = 0
    \end{aligned}
\end{equation}
$$

这是一个不那么明显的性质, 有时候甚至意识不到它应该是守恒的.

对 Maxwell 方程同样有很重要的 _indirect_ 性质: 能量和动量的守恒, 比如能量守恒可以描述为:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial }{\partial t} \left(\frac{\mathbfit{B}^{2}}{2 \mu_{0}} + \frac{\epsilon_{0} \mathbfit{E}^{2}}{2}\right) + \frac{1}{\mu_{0}} \nabla \cdot \left(\mathbfit{E} \times \mathbfit{B}\right) = - \mathbfit{E} \cdot \mathbfit{J} 
    \end{aligned}
\end{equation}
$$

{% hideToggle 电磁场能量守恒的推导 %}
这是电动力学的基本结果, 高中知识可以得到, 电磁场作用物体实际上不是作用物体本身, 而是作用于电荷或者电流, 同时磁场对运动电荷(电流)产生的力总是与电荷运动的方向垂直的(不做功), 那么我只需要算电场对运动电荷所做的功即可, 也就是:
$$
\begin{equation}
    \begin{aligned}
        \int \mathbfit{E} \cdot \rho \mathrm{\,d}\tau \mathrm{\,d}\mathbfit{l}
    \end{aligned}
\end{equation}
$$
$l$ 是电荷在电场作用下运动的距离. 考虑对时间的微分形式:
$$
\begin{equation}
    \begin{aligned}
        \frac{\mathrm{\,d}W}{\mathrm{\,d}t} &= \int \mathbfit{E} \cdot \rho \mathrm{\,d}\tau \mathrm{\,d}\mathbfit{l}/\mathrm{\,d}t \\
        & = \int \mathbfit{E} \cdot \rho \mathbfit{v} \mathrm{\,d}\tau \\
        &= \int \mathbfit{E} \cdot \mathbfit{j} \mathrm{\,d}\tau
    \end{aligned}
\end{equation}
$$
然后根据 Maxwell 方程的第四项:
$$
\begin{equation}
    \begin{aligned}
        &\mathbfit{j} = \frac{1}{\mu_{0}} (\nabla \times \mathbfit{B}) - \epsilon_{0} \frac{\partial \mathbfit{E}}{\partial t} \\
        &\Rightarrow \mathbfit{j} \cdot \mathbfit{E}  = \frac{1}{\mu_{0}} (\nabla \times \mathbfit{B}) \cdot \mathbfit{E} - \frac{\epsilon_{0}}{2} \frac{\partial \mathbfit{E}^{2}}{\partial t}
    \end{aligned}
\end{equation}
$$
根据矢量恒等式: $\nabla \cdot (\mathbfit{B} \times \mathbfit{E}) = E \cdot (\nabla \times \mathbfit{B}) - \mathbfit{B} \cdot (\nabla \times \mathbfit{E})$ 可以得到
$$
\begin{equation}
    \begin{aligned}
        \mathbfit{j} \cdot \mathbfit{E} = \frac{1}{\mu_{0}} \nabla \cdot \left(\mathbfit{B} \times \mathbfit{E}\right) + \frac{1}{\mu_{0}} \mathbfit{B} \cdot (\nabla \times \mathbfit{E}) - \frac{\epsilon_{0}}{2}\frac{\partial \mathbfit{E}^{2}}{\partial t}
    \end{aligned}
\end{equation}
$$
再利用 $\nabla \times \mathbfit{E} = -\frac{\partial \mathbfit{B}}{\partial t}$ 经过简单化简就能得到:
$$
\begin{equation}
    \begin{aligned}
        \mathbfit{E} \cdot \mathbfit{j} = -\frac{1}{\mu_{0}} \nabla \cdot (\mathbfit{E} \times \mathbfit{B}) - \frac{1}{2 \mu_{0}}\frac{\partial \mathbfit{B}^{2}}{\partial t} - \frac{\epsilon_{0}}{2} \frac{\partial \mathbfit{E}^{2}}{\partial t}
    \end{aligned}
\end{equation}
$$
也就是上面正文中的式子, 可以证明这就是电磁场的能量守恒表达式.
{% endhideToggle %}

但是这是连续的情况下得到结论, 当我们做数值离散的时候保持能量守恒这个特性是需要面对的一个问题.

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/Compute methods in plasma-20230625210600.png" alt="Compute methods in plasma-20230625210600">
<center id='f1'><span style='font-weight:bold'>Fig 1. Energy conserving scheme for Maxwell equations (purple) compared to non-conservative scheme (black). Conservation of energy means there is no damping of spurious high-k modes.</span></center>

如果将 Vlasov 方程考虑进去能量守恒还需要加上粒子的动能, 同时体系变成封闭体系, 即:

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}}{\mathrm{d}t} \sum _{s} \int _{K} \frac{1}{2} m \left|v\right|^{2} f \mathrm{\,d}z + \frac{\mathrm{d}}{\mathrm{d}t} \int _{\Omega} \left(\frac{\epsilon_{0}}{2} \left|\mathbfit{E}\right|^{2} + \frac{1}{2\mu_{0}} \left|\mathbfit{B}\right|^{2}\right)\mathrm{\,d}^{3}x = 0
    \end{aligned}
\end{equation}
$$

但是对于离散的数值方案来说这个性质并不是那么明显成立的, 相似的问题在哈密顿方程描述等离子体的数值方案中同样也存在.

除了能量和动量守恒外, Vlasov-Maxwell 方程或者一些其他方程还有着熵在无碰撞情况下是守恒的, 碰撞情况下是单调递增等性质, 这些性质在我们的数值方案中也并不是可以确定存在的.

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}}{\mathrm{d}t} \int _{K} -f \ln(f) \geq 0
    \end{aligned}
\end{equation}
$$

总能量守恒我们都知道, 一个典型的流体力学代码也包含了总能量守恒这一性质, 但是如果只考虑动能的演化呢? 通常我们可以得到:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial }{\partial t} \int _{\Omega} \frac{1}{2} \rho \mathbfit{u}^{2} \mathrm{\,d}x + \oint _{\partial \Omega} \left(\frac{1}{2} \rho \mathbfit{u}^{2} + \mathbfit{p}\right) \mathbfit{u} \cdot \mathrm{\,d}\mathbfit{s} - \int _{\Omega} \mathbfit{p} \nabla \cdot \mathbfit{u} \mathrm{\,d}x = 0
    \end{aligned}
\end{equation}
$$

这个式子展示了动能变化来自流体的可压缩性. 在等离子体中 $\mathbfit{J} \cdot \mathbfit{E}$ 这一项也展示了粒子与场之间的能量交换. 但是数值方案中有这个性质吗, 有什么奇怪的交换项将能量在不同项之间的分配给搞砸了吗, 这是一个需要思考的问题. 不正确的离散交换会引起高阶模错误的能量交换行为, 这些模式的精确性将会影响我们理解湍流的本质.

## 计算等离子体中的一些常见方案

### 电磁场中的单粒子运动

PIC 模拟实际上是在拉格朗日框架下的相空间中求解 Vlasov-Maxwell 方程, 此时的分布函数将会沿着相空间的特征(characteristics)保持不变. 这些特征(characteristics)满足洛伦兹力作用下粒子运动的常微分方程:

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}\mathbfit{x}}{\mathrm{d}t} &= \mathbfit{v} \\
        \frac{\mathrm{d}\mathbfit{v}}{\mathrm{d}t} &= \frac{q}{m} (\mathbfit{E}(x,t) + \mathbfit{v} \times \mathbfit{B}(x,t))
    \end{aligned}
\end{equation}
$$

我们先关注单个粒子的运动方程, 之后再将其与电磁场以及其他粒子耦合起来.

### 简单谐振子

首先考虑一个简单谐振子:

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}^{2}z}{\mathrm{d}t^{2}} = -\omega^{2} z
    \end{aligned}
\end{equation}
$$

对这样的方程我们有一个精确的解的形式(<span class='mohu'>高等数学中已经学过</span>) $z = a \cos(\omega t) + b \sin(\omega t)$. 写成一阶常微分方程的形式:

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}z}{\mathrm{d}t} = v;\ \frac{\mathrm{d}v}{\mathrm{d}t} = -\omega^{2} z
    \end{aligned}
\end{equation}
$$

这样, 这个简单谐振子的相空间就由坐标 $(z,v)$ 构建起来, 类比到实际物理中这就是牛顿力学的具体表述, 现在我们将 $v$ 乘到第二个式子中以得到动能的形式:

$$
\begin{equation}
    \begin{aligned}
        &\frac{\mathrm{d}}{\mathrm{d}t} \frac{1}{2} v^{2} = -\omega^{2} z \frac{\mathrm{d}z}{\mathrm{d}t} \\
        \Rightarrow &\frac{\mathrm{d}}{\mathrm{d}t} \left(\frac{1}{2} v^{2} + \frac{1}{2} \omega^{2} z^{2}\right) = 0
    \end{aligned}
\end{equation}
$$

这就是简单谐振子这个系统中能量守恒的表达. 问题是我们怎么在离散的数值方案中保证这个性质也是成立的呢?

### 前向欧拉方法

最简单的方案, 采用用差分代替微分的思路:

$$
\begin{equation}
    \begin{aligned}
        \frac{z^{n+1} - z^{n}}{\Delta t} = v^{n};\ \frac{v^{n+1}-v^{n}}{\Delta t} = -\omega^{2} z^{n}
    \end{aligned}
\end{equation}
$$

或者

$$
\begin{equation}
    \begin{aligned}
        z^{n+1} = z^{n}+\Delta t v^{n};\ v^{n+1} = v^{n}-\Delta t \omega^{2} z^{n}
    \end{aligned}
\end{equation}
$$

利用这种递推公式可以得出后一时刻的前面的总能量形式为:

$$
\begin{equation}
    \begin{aligned}
        \left(v^{n+1}\right)^{2}+\omega^{2}\left(z^{n+1}\right)^{2}=\left(1+\omega^{2} \Delta t^{2}\right)\left(\left(v^{n}\right)^{2}+\omega^{2}\left(z^{n}\right)^{2}\right)
    \end{aligned}
\end{equation}
$$

可以看到, 如果能量守恒后者应该是 $\left(v^{n}\right)^{2}+\omega^{2}\left(z^{n}\right)^{2}$, 但这种方法多出了一个 $\omega^{2} \Delta t^{2}$, 因此这种前向欧拉方法是不具有能量守恒性质的, 实际上每多走一步系统的能量是在增加的. 更近一步地, 我们可以把上面的差分式子写成矩阵形式:

$$
\begin{equation}
    \begin{aligned}
        \left[\begin{array}{l}z^{n+1} \\ v^{n+1}\end{array}\right]=\underbrace{\left[\begin{array}{cc}1 & \Delta t \\ -\omega^{2} \Delta t & 1\end{array}\right]}_{\text {Jacobian, } J}\left[\begin{array}{l}z^{n} \\ v^{n}\end{array}\right]
    \end{aligned}
\end{equation}
$$

把前面的矩阵称作 Jacobian 矩阵, 其行列式为: $\det(\mathbfit{J}) = (1+\omega^{2}\Delta t^{2})$, 这正好就是前面能量关系中出现的因子, 于是我们可以很自然地得到结论:

{% note success %}
如果某个数值方案的雅可比(Jacobian)矩阵的行列式 $\det(\mathbfit{J}) = 1$, 那么这种方案具有能量守恒的性质, 我们称之为 **"保体积方法"**, 因为这种方法可以保证相空间体积是不变的.
{% endnote %}

### 中点法(Mid-point Scheme)

另一种更好的方案可能是中点平均格式的数值方法, 其递推公式变成:

$$
\begin{equation}
    \begin{aligned}
        \frac{z^{n+1}-z^{n}}{\Delta t} &= \frac{v^{n}+v^{n+1}}{2} \\
        \frac{v^{n+1}-v^{n}}{\Delta t} &= -\omega^{2} \frac{z^{n}+z^{n+1}}{2}
    \end{aligned}
\end{equation}
$$

这是一种隐式格式的算法, 这意味着下一步的解不仅依赖于当前步的值, 也依赖于下一步的值. 类似的我们也可以写成矩阵形式:

$$
\begin{equation}
    \begin{aligned}
        \left[\begin{array}{c}z^{n+1} \\ v^{n+1}\end{array}\right]=\frac{1}{1+\omega^{2} \Delta t^{2} / 4}\left[\begin{array}{cc}1-\omega^{2} \Delta t^{2} / 4 & \Delta t \\ -\omega^{2} \Delta t & 1-\omega^{2} \Delta t^{2} / 4\end{array}\right]\left[\begin{array}{c}z^{n} \\ v^{n}\end{array}\right]
    \end{aligned}
\end{equation}
$$

可以算出对于这种方法 $\det(\mathbfit{J}) = 1$, 因此这是一种相空间体积守恒的方法, 同时你也可以通过代数计算出:

$$
\begin{equation}
    \begin{aligned}
        (v^{n+1})^{2} + \omega^{2} (z^{n+1})^{2} = (v^{n})^{2} + \omega^{2} (z^{n})^{2}
    \end{aligned}
\end{equation}
$$

这表示这个方法具有能量守恒的特性.

对于简单谐振子来说一个更加严格的约束是 Jacobian 矩阵应该是一个辛矩阵, 满足以下的关系:

$$
\begin{equation}
    \begin{aligned}
        \mathbfit{J}^{T} \sigma \mathbfit{J} = \sigma
    \end{aligned}
\end{equation}
$$

其中 $\sigma$ 是单位辛矩阵:

$$
\begin{equation}
    \begin{aligned}
        \sigma = \left[\begin{array}{cc}0 & 1 \\ -1 & 0\end{array}\right]
    \end{aligned}
\end{equation}
$$

可以证明的是中点方法确实满足这一条件, 应该注意的是一个保体积算法并不一定是具有辛对偶特性的.

### 精确度和稳定性

学习精确度以及稳定性的问题一般用下面的一阶常微分方程来入手:

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}z}{\mathrm{d}t} = - \gamma z
    \end{aligned}
\end{equation}
$$

其中, $\gamma = \omega + i \lambda$ 是复频率, 这个方程的严格解为: $z(t) = z_{0} e^{-\gamma t}$, 这表明解会存在一个阻尼 $\lambda < 0$ 或者增长 $\lambda > 0$ 的振荡模式. 对于这个方程, 前向欧拉方法为:

$$
\begin{equation}
    \begin{aligned}
        z^{n+1}=z^{n}-\Delta t \gamma z^{n}=(1-\Delta t \gamma) z^{n}
    \end{aligned}
\end{equation}
$$

中点方法为:

$$
\begin{equation}
    \begin{aligned}
        z^{n+1}&=\left(\frac{1-\gamma \Delta t / 2}{1+\gamma \Delta t / 2}\right) z^{n} \\
        &= z^{n} \left(1-\Delta t \gamma - \frac{1}{2} \gamma^{2} \Delta t^{2} - \frac{1}{4} \gamma^{3} \Delta t^{3} + \ldots\right)
    \end{aligned}
\end{equation}
$$

通常我们检查方案的精确度是看其与严格解的差分形式泰勒展开有多少项是相同的, 在这个例子中泰勒展开如下:

$$
\begin{equation}
    \begin{aligned}
        z\left(t^{n+1}\right)=z\left(t^{n}\right)\left(1-\gamma \Delta t+\frac{1}{2} \gamma^{2} \Delta t^{2}-\frac{1}{6} \gamma^{3} \Delta t^{3}+\ldots\right)
    \end{aligned}
\end{equation}
$$

可以看出前向欧拉方法只有一阶的精度, 而中点方法却有三阶的精度.

如果对于某个问题的数值方案产生的误差不会随着时间的迭代而增加我们就称这个数值方法是 **稳定的**. 可以用一个简单的数(amplification factor)来判断:

$$
\begin{equation}
    \begin{aligned}
        \left|\frac{e^{n+1}}{e^{n}}\right| = \left|\frac{z^{n+1} - z_{\star}^{n+1}}{z^{n} - z_{\star}^{n}}\right| = \left|\frac{D(z^{n})-D(z_{\star}^{n})}{z^{n} - z_{\star}^{n}}\right|
    \end{aligned}
\end{equation}
$$

其中, $z_{\star}^{n}$ 表示当前步的精确解, $D(z^{n})$ 表示数值方案对应的差分关系. 在这个例子中(我们这里只考虑 $\lambda = 0$ 的情况, 即没有阻尼或者增长的情况), 前向欧拉格式对应的 amplification factor 为 $1 - \Delta t \omega$. 要保证数值误差不增长( $\omega > 0$ ), 需要 $\Delta t \leq \frac{2}{\omega}$. 所以我们说前向欧拉方法是**条件稳定的**. 如果是中点方法, amplification factor 很明显为 1, 也就是说用中点法数值求解这个方程是 **无条件稳定的**, 这意味着你可以取一个很大的计算步长而不会引起误差的爆炸 <span class='mohu'>Of course, the error will increase with the large $\Delta t$</span>.

虽然前向欧拉方法是条件稳定的算法, 但是我们依旧可以在它的基础上开发更稳定更精确的算法. 前面提到的两种算法都是单步算法, 只需要计算一次就可以得到结果, 实际计算的时候我们还可以采用多步算法(multi-stage), 比如龙格库塔方法(Runge-Kutta methods), 这种方法具有较高的精度以及较强的稳定性. 值得注意的是这些龙格库塔方法对简单谐振子来说并不能保证能量守恒, 反而会导致能量的衰减, 如果要保证物理性质不丢失, 还需要检验算法的相关特性.

### 电磁场中的单粒子运动数值计算

前面已经给出了带电粒子在电磁场中的运动方程, 很明显, 如果没有电场存在系统的动能将会是一个常数:

$$
\begin{equation}
    \begin{aligned}
        \frac{1}{2} \left|\mathbfit{v}\right|^{2} = \text{constant}
    \end{aligned}
\end{equation}
$$

这意味着在几何上, 没有电场存在时速度矢量将会始终落在在空间中的一个球面上.

这里我们给出带电粒子运动方程的中点格式:

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathbfit{x}^{n+1}-\mathbfit{x}^{n}}{\Delta t}&=\frac{\mathbfit{v}^{n+1}+\mathbfit{v}^{n}}{2} \\ \frac{\mathbfit{v}^{n+1}-\mathbfit{v}^{n}}{\Delta t}&=\frac{q}{m}\left(\overline{\mathbfit{E}}(\mathbfit{x}, t)+\frac{\mathbfit{v}^{n+1}+\mathbfit{v}^{n}}{2} \times \overline{\mathbfit{B}}(\mathbfit{x}, t)\right)
    \end{aligned}
\end{equation}
$$

overbar 表示新旧位置电磁场的平均, 一般来说, 这会使我们的数值方法变得非线性. 我们也可以使用一种交错式(或者也称之为**蛙跳格式**)的推进方法:

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathbfit{x}^{n+1}-\mathbfit{x}^{n}}{\Delta t} & =\mathbfit{v}^{n+1 / 2} \\ \frac{\mathbfit{v}^{n+1 / 2}-\mathbfit{v}^{n-1 / 2}}{\Delta t} & =\frac{q}{m}\left(\mathbfit{E}\left(\mathbfit{x}^{n}, t^{n}\right)+\frac{\mathbfit{v}^{n+1 / 2}+\mathbfit{v}^{n-1 / 2}}{2} \times \mathbfit{B}\left(\mathbfit{x}^{n}, t^{n}\right)\right)
    \end{aligned}
\end{equation}
$$

这看起来是一种隐式格式的方法, 通常是构建一个 $3 \times 3$ 的线性系统来代表这个方程, 然后通过取逆的方式来决定 $\mathbfit{v}^{n+1}$. Boris 算法采用以下的步骤来更新这个方程:

$$
\begin{equation}
    \begin{aligned}
        \mathbfit{v}^{-} & =\mathbfit{v}^{n-1 / 2}+\frac{q}{m} \mathbfit{E}^{n} \frac{\Delta t}{2} \\ \frac{\mathbfit{v}^{+}-\mathbfit{v}^{-}}{\Delta t} & =\frac{q}{2 m}\left(\mathbfit{v}^{+}+\mathbfit{v}^{-}\right) \times \mathbfit{B}^{n} \\ \mathbfit{v}^{n+1 / 2} & =\mathbfit{v}^{+}+\frac{q}{m} \mathbfit{E}^{n} \frac{\Delta t}{2}
    \end{aligned}
\end{equation}
$$

这个过程中, 需要进行两次电场对速度的推进以及一次磁场对速度的旋转[^1]. 一旦速度通过这种方式计算出来之后, 我们可以很轻松的更新出下一时刻的位置. 其中磁场对粒子速度的旋转被分成两个步骤进行:
1. 计算 $\mathbfit{s}$ 和 $\mathbfit{t}$ 这两个中间矢量
$$
t = \frac{q \mathbfit{B}}{m} \frac{\Delta t}{2} \\ s= \frac{2 t}{1+\left|t\right|^{2}}
$$
2. 计算 $v^{\prime} = v^{-}+v^{-} \times \mathbfit{t}$, 然后 $v^{+} = v^{-} + v^{\prime} \times \mathbfit{s}$.

一些具体的细节还可以参考 Birdsall 和 Langdon 的书 4-3 以及 4-4 部分[^2]. 如果没有电场存在的情况下 Boris 方法计算的动能是守恒的, 另一些 Boris 计算方式的优点可以看 Qin et al. (2013) 的文章[^3].

### 求解 Maxwell 方程组

解决完电磁场中带电粒子的推进, 我们还需要通过计算 Maxwell 方程组来考虑场与电流电荷之间的自洽. 首先考虑真空中的 Maxwell 方程组:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial \mathbfit{B}}{\partial t}+\nabla \times \mathbfit{E}=0 \\ \epsilon_{0} \mu_{0} \frac{\partial \mathbfit{E}}{\partial t}-\nabla \times \mathbfit{B}=0
    \end{aligned}
\end{equation}
$$

于是我们可以得到两条守恒定律:

$$
\begin{equation}
    \begin{aligned}
        \frac{d}{d t} \int_{\Omega} \mathbfit{E} \times \mathbfit{B} d^{3} \mathbfit{x}=0 \\ \frac{d}{d t} \int_{\Omega}\left(\frac{\epsilon_{0}}{2}|\mathbfit{E}|^{2}+\frac{1}{2 \mu_{0}}|\mathbfit{~B}|^{2}\right) d^{3} x=0
    \end{aligned}
\end{equation}
$$

注意这些守恒律都是全局的, 我们也可以写出带有能量通量的局部守恒律. 如果有效的计算这些方程并保留其守恒特性呢? 考虑到 Maxwell 方程具有以下几个特性: 

- 特殊的几何结构, 电场 $\mathbfit{E}$ 是矢量, 但磁场 $\mathbfit{B}$ 是二重向量(bivector)[^4][^5]
- 完整的电磁场在 4 维时空的时空代数形式下被表示为一个二重向量

也就是说事实上, 我们正在处理两个不同几何类型的物体, 这表明离散麦克斯韦方程组也应该以某种方式继承这一点. Yee 算法, 或者说 **有限差分时域算法** 是目前在考虑几何结构方面最成功也是最简单的算法, 这种方法被应用在大部分的 PIC 模拟中 <span class='mohu'>尽管最近人们开始研究保结构有限元算法以及一些其他的方法</span>.

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/Compute methods in plasma-20230627201409.png" alt="Compute methods in plasma-20230627201409" style="zoom:50%;" >

<center id='f2'><span style='font-weight:bold'>Fig 2. Illustration of the Yee-cell.</span></center>

Yee 网格对 Maxwell 方程的差分约化简直就像是魔法一样 <span class='heimu'>(OK, 其实我并不是很懂这个方法有多么牛逼, 原谅我还是太菜了, 但是原文就是这么说的!!!)</span>. 这些更新方案在时间上是交错的, 过程中使用了两种不同的离散旋度运算符:

$$
\begin{equation}
    \begin{aligned}
        \mathbfit{B}^{n+1 / 2} & =\mathbfit{B}^{n-1 / 2}-\Delta t \nabla_{E} \times \mathbfit{E}^{n} \\ \mathbfit{E}^{n+1} & =\mathbfit{E}^{n}+\Delta t / c^{2} \nabla_{F} \times \mathbfit{B}^{n+1 / 2}
    \end{aligned}
\end{equation}
$$

这里 $\nabla _{F} \times $ 符号以及 $\nabla _{E} \times $ 符号都是离散的旋度算符:

- 第一种算符作用于面(Face)中心的磁场并计算其旋度, 最终得到在网格(cell)边上的值;
- 第二种算符作用于边(Edge)中心的电场并计算其旋度, 最终得到网格面上的值.
- 这种网格方法也暗含了<span style='background: pink'>电流必须和电场在同一位置, 同时需要半个时间步长计算一次</span>.

这种对偶性巧妙地反映了麦克斯韦方程组的基本几何形状. 时间上的错位反映了这样一个事实: 在四维时空中, 电磁场是时空中的一个二重向量. 我们也可以展示出这种离散方法严格地保持了 Maxwell 方程组中散度关系:

$$
\begin{equation}
    \begin{aligned}
        \nabla_{F} \cdot \mathbfit{B}^{n+1 / 2} & =0 \\ \nabla_{E} \cdot \mathbfit{E}^{n} & =0
    \end{aligned}
\end{equation}
$$

对于等离子体来说, Maxwell 方程组还需要满足电流守恒的约束:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial \varrho_{c}}{\partial t} + \nabla \cdot \mathbfit{J} = 0
    \end{aligned}
\end{equation}
$$

其中, $\varrho_{c}$ 是电荷密度, $\mathbfit{J}$ 是电流密度. 在 Yee 网格离散的形式下上式变成了:

$$
\begin{equation}
    \begin{aligned}
        \frac{\varrho_{c}^{n+1}-\varrho_{c}^{n}}{\Delta t}+\nabla_{E} \cdot \mathbfit{J}^{n+1 / 2}=0
    \end{aligned}
\end{equation}
$$

这个过程中必须要确认从粒子到电流的计算不会出错以保证这个表达式是成立的, 更多的细节一下在 Esirkepov, Comp. Phys. Communications, 135 144-153 (2001)[^6] 这篇文章中找到.

## 总结与正在进行的工作

- 计算等离子体物理学是困难的: 还有许多工作要做, 以便为各种等离子体应用创建工具; 在方案设计中必须考虑到微妙的间接性质.
- 潜在高影响力领域: 需要限制可能的聚变装置的空间, 并帮助了解预期的燃烧等离子体状态.

最后是 A. Hakim 教授的一些个人建议, 这里直接贴原文:

>1. Computational physics is a rapidly evolving field. Good field to be in!
>2. Strive for technical excellence. Do not settle for existing methods or tools and spend time in understanding deeply both the physics of the equations and the numerics used to solve them. Go beyond your classwork and thesis reasearch (make it a point to read arxiv physics.comp-ph and math.NA postings every day).
>3. Modern computational physics is moving to C and C++: please learn them. Use good software practices (write modular code, use version control, build systems, regression tests). Even for your thesis code!
>4. To become really good you must apprentice yourself to a genuine expert.
>5. If you become an expert at the (i) physics (ii) mathematics of the numerical methods (iii) programming and software techniques, you will be in a very strong position to contribute to development in many different fields. You will bring unique skills which few other people will be.

---

[^1]: 有关Boris算法的更多详情可以参考: [Particle Push in Magnetic Field (Boris Method) (particleincell.com)](https://www.particleincell.com/2011/vxb-rotation/)
[^2]: C K Birdsall & A B Langdon., Plasma Physics via Computer Simulation (CRC Press)
[^3]: Qin, H., Zhang, S., Xiao, J., et al. 2013, Physics of Plasmas, 20, 084503
[^4]: https://en.wikipedia.org/wiki/Bivector
[^5]: https://en.wikipedia.org/wiki/Mathematical_descriptions_of_the_electromagnetic_field
[^6]: Esirkepov, T. Zh. 2001, Computer Physics Communications, 135, 144