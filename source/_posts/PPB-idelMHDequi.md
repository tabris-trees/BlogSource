---
title: 理想磁流体平衡
date: 2023-02-13 14:31:45
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-tokamak.png
tags:
- 等离子体物理
- 磁流体力学
- 磁约束核聚变
categories: [笔记,等离子体物理]
description: 基于王晓钢老师的《等离子体物理》第二章的内容对磁流体平衡的内容进行简单介绍
---

<center><h1>理想磁流体平衡</h1></center>

{% note info %}
本文是王晓刚老师《等离子体物理基础》第二章内容的笔记整理，方便此后查阅
{% endnote %}

从物理上来看，一个系统总是趋于能量最低的平衡状态，此时的运动形式相对简单。一般来说，我们将磁流体的平衡指的是**力学平衡（磁流体力学的平衡）**，而非热力学平衡（速度分布的平衡，对应的是动理学理论的平衡）。这种平衡对于可控核聚变来说是非常重要的，我们需要将温度极高的等离子体通过外部力场约束在固定范围内以提供聚变产生的原材料，完成这一目标的首要条件就是做到磁流体平衡。

## 磁场的一般表示

根据Maxwell方程组中的高斯定理我们知道：

$$\begin{equation}
    \begin{aligned}
        \nabla \cdot \mathbfit{B} = \frac{\partial B_x}{\partial x}+\frac{\partial B_y}{\partial y}+\frac{\partial B_z}{\partial z} = 0
    \end{aligned}
\end{equation}$$

这就是说磁场的三个分量并非独立的，因此实际上磁场可以只用两个分量来表示。通过矢量恒等式：

$$\begin{equation}
    \begin{aligned}
        \nabla \cdot (\vec{A} \times \vec{B}) = (\nabla \times \vec{A} ) \cdot \vec{B} - \vec{A} \cdot (\nabla \times \vec{B})
    \end{aligned}
\end{equation}$$

再者一个矢量可以写成标量的梯度形式，因此我们选择将描述磁场的两个分量表示成 $\nabla \alpha $, $ \nabla \beta$，有：

$$\begin{equation}
    \begin{aligned}
        \nabla \cdot (\nabla \times \vec{A}) = 0 \implies \mathbfit{B} = \nabla \alpha \times \nabla \beta
    \end{aligned}
\end{equation}$$

考虑直角坐标系下的磁力线方程（磁场$\mathbfit{B}$与磁力线的方向是一致的）：

$$\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}x}{B_x} = \frac{\mathrm{d}y}{B_y} = \frac{\mathrm{\,d}z}{B_z}
    \end{aligned}
\end{equation}$$

上述方程可以提取出两个独立的方程：

$$\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}y}{\mathrm{d}x} = \frac{B_y}{B_x}, \frac{\mathrm{d}z}{\mathrm{d}x} = \frac{B_z}{B_x}
    \end{aligned}
\end{equation}$$

这两个方程的解分别对应了两个三维空间中的曲面，曲面的交线（两个曲面方向导数的叉乘 $\mathbfit{B} = \nabla \alpha \times \nabla \beta$ ，这就正好对应了前面提到的描述磁场只需要两个独立的变量，即曲面 $C_{\alpha}, C_{\beta}$ ）即是磁力线。

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-EBC5A2913971E69F7D1376D20F6F7EF4.jpg" alt = "PPB-idelMHDequi-f1" width = "300">

<center id='f1'><span style='font-weight:bold'>Fig 1 上述过程的几何描述</span></center>

这两个曲面的选择可以是任意的，所以同一个磁场可能对应多种不同的选择进行描述。因此，我们进一步可以把磁场写成：

$$\begin{equation}
    \begin{aligned}
        \mathbfit{B} = F(\psi) \nabla \zeta + \nabla \psi \times \nabla \zeta
    \end{aligned}
    \label{eq:bfield}
\end{equation}$$

这样就变成了一个正交曲线坐标系($\nabla \psi, \nabla \zeta, \nabla \chi = \nabla \psi \times \nabla \zeta$)所表示的磁场, 于是我们可以把磁力线方程写成:

$$\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}l}{B} = \frac{\mathrm{d}\psi}{\mathbfit{B} \cdot \nabla \psi} = \frac{\mathrm{d}\chi}{\mathbfit{B} \cdot \nabla \chi} = \frac{\mathrm{d}\zeta}{\mathbfit{B} \cdot \nabla \zeta}
    \end{aligned}
\end{equation}$$

的形式. 如果我们选取聚变中常用的"托卡马克环坐标系($\psi(r), \theta, z$)", 则有:

$$\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}l}{B}  = \left(\frac{\mathrm{d}\psi}{B_r \mathrm{\,d}\psi/\mathrm{\,d}r} = \right) \frac{\mathrm{d}r}{B_r} = \frac{r \mathrm{d}\theta}{B_{\theta}} = \frac{\mathrm{d}z}{B_z}
    \end{aligned}
\end{equation}$$

## 磁约束等离子体的力学平衡

所谓力学平衡就是说等离子体的运动状态不随时间改变, 即 $\partial/\partial t = 0$. 我们通常所说的等离子体平衡就是指这种力学平衡(在运动状态不变的情况下, $\mathbfit{u} \not = 0$ 称为"稳态平衡", $\mathbfit{u} = 0$ 称为"静态平衡").

根据理想磁流体方程:

$$\begin{equation}
    \begin{aligned}
        n m_i \left(\frac{\partial \mathbfit{u}}{\partial t} + \mathbfit{u} \cdot \nabla \mathbfit{u}\right) = -\nabla p + \frac{(\nabla \times \mathbfit{B}) \times \mathbfit{B}}{4\pi}
    \end{aligned}
\end{equation}$$

等离子体平衡时有:

$$\begin{equation}
    \begin{aligned}
        \rho_m (\mathbfit{u} \cdot \nabla \mathbfit{u}) = - \nabla p + \frac{(\nabla \times \mathbfit{B}) \times \mathbfit{B}}{4\pi}
    \end{aligned}
\end{equation}$$

如果是静态平衡则变成:

$$\begin{equation}
    \begin{aligned}
        \nabla p = \frac{(\nabla \times \mathbfit{B}) \times \mathbfit{B}}{4\pi} = \frac{\mathbfit{J} \times \mathbfit{B}}{c}\ (\text{忽略位移电流项})
    \end{aligned}
    \label{eq:1}
\end{equation}$$

这个时候我们看到这种两个叉乘在一起的一般都会利用矢量恒等式进行化简, 回去翻翻矢量恒等式的列表, 发现有 $\nabla (\mathbfit{A} \cdot \mathbfit{B}) = \mathbfit{A} \times (\nabla \times \mathbfit{B}) + \mathbfit{B} \times (\nabla \times \mathbfit{A}) + \mathbfit{A} \cdot \nabla \mathbfit{B} + \mathbfit{B} \cdot \nabla \mathbfit{A}$. 把这里的磁场带进去就有:

$$\begin{equation}
    \begin{aligned}
        (\nabla \times \mathbfit{B}) \times \mathbfit{B} = - \frac{\nabla B^2}{2} + \mathbfit{B} \cdot \nabla \mathbfit{B}
    \end{aligned}
\end{equation}$$

结合公式 $\eqref{eq:1}$ 于是我们可以得到在静态平衡下

$$\begin{equation}
    \begin{aligned}
        \nabla \left(p + \frac{B^2}{8\pi}\right) = \frac{\mathbfit{B} \cdot \nabla \mathbfit{B}}{4\pi} = \hat{b} \nabla_{\parallel} \left(\frac{B^2}{8\pi}\right) + \pmb{\kappa} \frac{B^2}{4\pi}
    \end{aligned}
\end{equation}$$

其中, 磁场单位矢量 $\hat{b} \equiv \mathbfit{B}/B$, 平行磁场的梯度 $\nabla_{\parallel} \equiv \hat{b} \cdot \nabla$, $\pmb{\kappa} \equiv \hat{b} \cdot \nabla \hat{b} = \nabla_{\parallel} \hat{b}$. 根据矢量与张量的点乘运算

$$\begin{equation}
    \begin{aligned}
        &\mathbf{A} \cdot \mathbfit{A} = \sum_{ij} T_{ij}\mathbfit{e}_i\mathbfit{e}_j \cdot \sum_{l} f_l\mathbfit{e}_l = \sum_{ijl} T_{ij}f_{l}\mathbfit{e}_{i} \delta_{jl} = \sum _{ij} T_{ij} f_{j} e_{i}, \\
        &\mathbfit{A} \cdot \mathbf{A} = \sum _{ij} f_{i} T_{ij} e_{j}
    \end{aligned}
\end{equation}$$

所有带有平行分量的张量都会消失, 所以很明显 $\pmb{\kappa}$ 是垂直磁场方向的. 于是上式还可以写成是分量的形式:

$$\begin{equation}
    \begin{aligned}
        \nabla_{\perp} \left(p + \frac{B^2}{8\pi}\right) = \pmb{\kappa} \frac{B^{2}}{4\pi},\ \nabla_{\parallel} p = 0
    \end{aligned}
    \label{eq:15}
\end{equation}$$

## 磁面和磁通函数

对于任意变量都可以写成 $f = f(x,y)$ 形式的平板模型(slab model), 我们可以将 $\ref{eq:bfield}$ 取 $\zeta = -z, \psi = \psi(x,y)$ 来表示磁场:

$$\begin{equation}
    \begin{aligned}
        \mathbfit{B} = -F(\psi) \hat{z} + \hat{z} \times \nabla \psi \equiv B_z(\psi) \hat{z} + \hat{z} \times \nabla \psi
    \end{aligned}
    \label{eq:B2}
\end{equation}$$

这里我们可以看到, $z$ 方向是和 $\psi$ 有关的量, 同时垂直与 $z$ 方向的矢量取到的是 $\nabla \psi$, 这样很明显可以看出 $\psi = \psi(x, y)$ 是磁矢势的 $z$ 方向分量, 我们可以将其称为**磁通函数**. 

{% note info %}
关于为什么要这样取值, 我们考虑磁场表示形式公式 $\ref{eq:bfield}$, $\psi$ 和 $\zeta$ 所表示的定义于 $(x, y, z)$ 坐标上的两个曲面是相互垂直的, 平板模型中一个曲面定义在 $(x, y)$ 坐标上, 另一个必然定义于 $z$ 坐标. 而 $\zeta$ 在两项中都是梯度项 $\nabla \zeta$, 这样自然是将 $\zeta$ 取成和 $z$ 相关, 至于正负号的选择就直接带进去试一试, 然后取简单的那一种形式就OK了. <span class='mohu'>个人理解, 仅供参考!</span>
{% endnote %}

然后我们再回到原本的"正交磁力线坐标", 即 $(x, y, z) \to (\psi, \chi, z)$. 这里 $\chi$ 坐标满足 $\nabla \chi \parallel \hat{z} \times \nabla \psi$ (之前说过 $\psi, \chi, \zeta = -z$ 之间是相互垂直的). 那么很显然地必然会有磁场的分量在 $\nabla \chi$ 方向上, 即 $\mathbfit{B}_{\chi}$. 换句话说, 在 $(x, y)$ 平面内必然会有磁力线在 $\psi(x, y) = C(\text{常数})$ 的曲线上(三维空间中这条曲线沿着 $z$ 方向延伸成一个曲面, 实际上就是类似于等势面, 只不过只是磁势的一个分量的等势). 这样, 在两条曲线 $\psi = \psi_{1}, \psi = \psi_{2}$ 上随便找两个点连起来, 穿过这条连线(同样在三维空间中是一个曲面)的磁力线根数被定义为**极向磁通量**:

$$\begin{equation}
    \begin{aligned}
        \iint_{\psi_{1} \to \psi_{2}} \mathbfit{B}_{x} \cdot \mathrm{\,d}\mathbfit{S}_{\psi, z} = \Psi_{\psi, \chi}
    \end{aligned}
\end{equation}$$

固定的 $\psi_{1}, \psi_{2}$ 之间的任意连线的极向磁通量一定相等. 这样我们在 $\psi_{1}$ 上选取 $x_{1}$, 在 $\psi_{2}$ 上选取 $x_{2}$, 完成对 $z$ 方向的积分后可以得到:

$$\begin{equation}
    \begin{aligned}
        \iint _{\psi_{1} \to \psi_{2}} \mathbfit{B}_{x} \cdot \mathrm{\,d}\mathbfit{S}_{\psi, z} &= \underbrace{L_{z} \int_{x_{1}}^{x_{2}} B_y \mathrm{\,d}x = L_{z} \int_{x_{1}}^{x_{2}} \frac{\partial \psi}{\partial y} \mathrm{\,d}x}_{\text{因为}\psi\text{是磁势的}\hat{z}\text{分量}} \\
        &= L_{z} \int _{\psi_{1}}^{\psi_{2}} \mathrm{\,d}\psi = L_{z} (\psi_{2}-\psi_{1})
    \end{aligned}
\end{equation}$$

很显然我们可以得出结论: 磁通函数 $\psi(x, y)$ 是 $\hat{z}$ 方向上单位长度上的极向磁通量.

根据Maxwell方程组以及之前得到的理想磁流体平衡方程, 结合磁场表示式 $\ref{eq:B2}$ 还可以得到:

$$\begin{equation}
    \begin{aligned}
        \mathbfit{J} &= \frac{c}{4\pi} \nabla \times \mathbfit{B} = \frac{c}{4\pi} \left(\frac{\mathrm{d}F}{\mathrm{d}\psi} \hat{z} \times \nabla \psi + \hat{z} \nabla ^{2} \psi\right), \\
        \nabla p &= \frac{\mathbfit{J} \times \mathbfit{B}}{c} = -\left(\nabla ^{2} \psi + F \frac{\mathrm{d}F}{\mathrm{d}\psi}\right) \frac{\nabla \psi}{4\pi}
    \end{aligned}
\end{equation}$$

可以看到, $\nabla p$ 仅仅只与 $\psi$ 有关, 上述方程的解应该有着 $p = p(\psi)$ 的形式, 那么在 $p = \text{常数}$ 的"面"上, 我们有磁通函数 $\psi = \text{常数}$ 的结论. 所以我们可以将这个曲面称为 **"磁面"**.

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-510bfbf51e28127ee5780c63602a27a.jpg" alt="PPB-idelMHDequi-磁通量" width = "300">
<center id='f2'><span style='font-weight:bold'>Fig 2. 上述过程的图像表示</span></center>

利用 $p = p(\psi)$, 上述的方程可以进一步化简:

$$\begin{equation}
    \begin{aligned}
        &\frac{4\pi \nabla p(\psi)}{\nabla \psi} = -\nabla ^{2} \psi - F(\psi) \frac{\mathrm{d}F(\psi)}{\mathrm{d}\psi} \\
        &\implies \nabla ^{2} \psi = -4\pi \left(\frac{\nabla p(\psi)}{\nabla \psi} + F(\psi)\frac{\mathrm{d}F(\psi)}{4\pi \mathrm{d}\psi}\right) \\
        &\because \nabla p(\psi) = \frac{\mathrm{d}p}{\mathrm{d}\psi} \nabla \psi, F(\psi)\frac{\mathrm{d}F(\psi)}{\mathrm{d}\psi} = \frac{\mathrm{d}}{\mathrm{d}\psi} \frac{F(\psi)^{2}}{2} \\ 
        &\implies \nabla ^{2} \psi = -4\pi \frac{\mathrm{d}}{\mathrm{d}\psi} \left(p(\psi) + \frac{F(\psi)^{2}}{8\pi}\right) \\
    \end{aligned}
\end{equation}$$

再加上 $F(\psi)$ 是磁场的 $-z$ 分量(式 $\ref{eq:B2}$), 有:

$$\begin{equation}
    \begin{aligned}
        \nabla ^{2} \psi = -4\pi \frac{\mathrm{d}}{\mathrm{d}\psi} \left[p + \frac{B_{z}^{2}}{8\pi}\right]
    \end{aligned}
\end{equation}$$

我们称这个方程为 **磁面方程**, 其适用于各种坐标系.

事实上, 从式 $\ref{eq:15}$ 中我们可以得到: 沿着一条磁力线有 $p = \text{常数}$. 如果这个磁力线卷曲成一个曲面, 曲面上处处都有同一个 $p$, 曲面的法线由 $\nabla p = \nabla _{\perp} p$ 给出. 同时, 根据静态平衡的方程我们可以有: $\mathbfit{B} \perp \nabla p, \mathbfit{J} \perp \nabla p$, 所以电流也在这个表面上, 也就是磁面上.

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-f3.jpg" alt="PPB-idelMHDequi-f3" width = "300">
<center id='f3'><span style='font-weight:bold'>Fig 3. 磁面, 压强梯度以及电流分布</span></center>

## 磁冻结

在流体力学中存在涡旋方程: $\partial \mathbfit{\omega}/\partial t = \nabla \times (\mathbfit{u} \times \mathbfit{\omega})$, 同时我们可以证明"涡旋"是冻结在流体中的, 即涡旋是和流体一起运动的. 在理想磁流体模型中, 磁场满足的磁感应方程具有和涡旋方程一致的形式: $\partial \mathbfit{B}/\partial t = \nabla \times (\mathbfit{u} \times \mathbfit{B})$. 我们可以合理的做出推测磁力线也是"冻结"在等离子当中的.

{% hideToggle 王晓刚老师书中磁冻结效应的推导(没怎么看明白),bg,color %}

将磁场的一般表示形式带入到磁感应方程中可以得到, 方程左边：

$$\begin{equation}
    \begin{aligned}
        \frac{\partial \mathbfit{B}}{\partial t} = \nabla \frac{\partial \alpha}{\partial t} \times \nabla \beta + \nabla \alpha \times \nabla \frac{\partial \beta}{\partial t} = \nabla \times \left(\frac{\partial \alpha}{\partial t} \nabla \beta - \frac{\partial \beta}{\partial t}\nabla \alpha\right)
    \end{aligned}
\end{equation}$$

方程右边: 

$$\begin{equation}
    \begin{aligned}
        \nabla \times (\mathbfit{u} \times \mathbfit{B}) &= \nabla \times \left[\mathbfit{u} \times \left(\nabla \alpha \times \nabla \beta\right)\right] \\
        &= \nabla \times \left[\nabla \alpha (\mathbfit{u} \cdot \nabla \beta) - \nabla \beta (\mathbfit{u} \cdot \nabla \alpha)\right]
    \end{aligned}
\end{equation}$$

其中 $\mathbfit{u} \cdot \nabla \alpha(\beta)$ 得到一个标量, 再乘上 $\alpha$, 上式实际上是对一个标量的梯度做叉乘, 最终的结果为 0(很容易证明, 基础的高等数学场论知识). 于是有:

$$\begin{equation}
    \begin{aligned}
        \nabla \times \left(\frac{\mathrm{d} \alpha}{\mathrm{d} t} \nabla \beta - \frac{\mathrm{d}  \beta}{\mathrm{d} t} \nabla \alpha\right) = 0
    \end{aligned}
\end{equation}$$

也就是说:

$$\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d} \alpha}{\mathrm{d} t} \nabla \beta - \frac{\mathrm{d}  \beta}{\mathrm{d} t} \nabla \alpha = \nabla \Psi
    \end{aligned}
\end{equation}$$

<span class='mohu'>因为对一个标量的梯度求旋度必然等于零.</span>

这里我们选择合适的度规, 使得 $\nabla \Psi = 0$. 此时由于 $\nabla \beta$ 以及 $\nabla \alpha$ 不会为零, 则必然会有:

$$\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d} \alpha}{\mathrm{d} t} = \frac{\mathrm{d} \beta}{\mathrm{d} t} = 0
    \end{aligned}
\end{equation}$$

这也就表明确定磁力线的两组曲面 $\alpha(x, y, z) = C_\alpha, \beta(x, y, z) = C_{\beta}$ 都是随着流体元运动的守恒量, 因此其交线----磁力线也随着流体元运动不变.

{% endhideToggle %}

由于上述的这个方式对于我们这种物理小白来说实在是不太友好, 所以我们这里考虑另外一种磁冻结效应的证明方式:

根据 $\partial \mathbfit{B}/\partial t = \nabla \times (\mathbfit{u} \times \mathbfit{B})$, 我们知道:

$$\begin{equation}
    \begin{aligned}
        \frac{\partial \mathbfit{B}}{\partial t} - \nabla \times (\mathbfit{u} \times \mathbfit{B}) = 0
    \end{aligned}
\end{equation}$$

同时, 磁通量可以通过磁场的面积分(即通过的磁力线的多少)得到, 也就是: $\Phi = \iint_{S} \mathbfit{B} \cdot  \mathrm{\,d}\mathbfit{S}$, 于是我们考虑对 $(27)$ 式的两边做一个面积分:

$$\begin{equation}
    \begin{aligned}
        \iint_{S} \frac{\partial \mathbfit{B}}{\partial t} \cdot \mathrm{\,d}\mathbfit{S} = \frac{\partial \iint_{S} \mathbfit{B} \cdot \mathrm{\,d}\mathbfit{S}}{\partial t} = \frac{\partial \Phi}{\partial t}
    \end{aligned}
\end{equation}$$

$$\begin{equation}
    \begin{aligned}
        \iint_{S} \nabla \times (\mathbfit{u} \times \mathbfit{B}) \cdot \mathrm{\,d}S = -\oint _{\partial S} (\mathbfit{B} \times \mathbfit{u}) \cdot \mathrm{\,d}\mathbfit{l} = -\oint _{\partial S} \mathbfit{B} \cdot  \mathbfit{u} \times  \mathrm{\,d}\mathbfit{l}
    \end{aligned}
\end{equation}$$

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-F76F245C16BE2A5CDE7D336666709101.png" alt="磁冻结示意图" width = "500">
<center id='f4'><span style='font-weight:bold'>Fig 4. 磁冻结示意图</span></center>

根据上图我们可以知道 $(29)$ 式实际上是磁流体流动引起的磁通量变化, 加上 $(28)$ 式表示的原本的磁通量就是理想磁流体中总的磁通量随时间的变化. 即:

$$\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}\Phi}{\mathrm{d}t} &= \frac{\partial \Phi}{\partial t} + \oint _{\partial S} \mathbfit{B} \cdot  \mathbfit{u} \times  \mathrm{\,d}\mathbfit{l} \\
        &=\iint _{S} \frac{\partial \mathbfit{B}}{\partial t} - \nabla \times (\mathbfit{u} \times \mathbfit{B}) \cdot \mathrm{\,d}S \\ &= 0
    \end{aligned}
\end{equation}$$

这就证明了一个固定的流体元的磁通量是随时间不变的, 也就是磁场冻结在流体中.

从微观角度来看, 一般来说磁冻结意味着带电粒子沿着磁力线作回旋运动. 然而系统中存在的各种物理量的梯度会导致粒子在不同的磁力线之间作横越磁力线的漂移运动, 那么磁冻结的图像应该怎么理解就是一个需要仔细讨论的问题. 从静态平衡的方程出发:

$$
\begin{equation}
    \begin{aligned}
        \nabla _{\perp p} = \frac{\mathbfit{J}_{\perp} \times \mathbfit{B}}{c}
    \end{aligned}
\end{equation}
$$

或者是:

$$
\begin{equation}
    \begin{aligned}
        \mathbfit{J}_{\perp} = - \frac{c \nabla _{\perp p} \times \mathbfit{B}}{B^{2}}
    \end{aligned}
\end{equation}
$$

也就是说, 等离子体电流是由静态平衡下的压强梯度漂移导致的. 很明显这个电流的存在会减弱原本的磁场, 因此被称为**抗磁漂移**. 前面的讨论我们已经知道电流是在磁面上存在的, 所以带电粒子实际上是在磁面上被 "冻结" 的. 而磁面是磁力线卷曲而成的曲面, 所以我们也可以说带电粒子实际上还是被冻结在同一条磁力线上.

要说的是, 磁流体近似下的电流是由压强梯度引起的, 而各种梯度运动的本质都是 Larmor 半径效应引起的, 所以磁流体电流的物理图像是 Larmor 半径的最低阶近似.

## Z - 箍缩, $\theta$ - 箍缩

磁约束平衡问题是理想磁流体平衡的一个重要的应用研究, 下面针对几个简单的几何位型作一些介绍, 比如类似单个直线导体中的电流或者螺线管线圈中电流产生的磁场对等离子体的约束.

### Z - 箍缩

首先是第一种情况, 电流沿着柱对称几何的轴向(z 方向), 产生的磁场可以表示为 $\mathbfit{B} = \hat{\theta}B_{\theta}(r)$, 即图5所示. 根据之前的平衡方程我们可以得到:

$$
\begin{equation}
    \begin{aligned}
        &\frac{\mathrm{d}}{\mathrm{d}r}\left(p + \frac{B_{\theta}^{2}}{8\pi}\right) = -\frac{B_{\theta}^{2}}{4 \pi r} \\
        &\frac{\mathrm{d}p}{\mathrm{d}r} = -\frac{1}{8 \pi r^{2}}\frac{\mathrm{d}}{\mathrm{d}r}(r^{2} B_{\theta}^{2})
    \end{aligned}
\end{equation}
$$

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-20230908170735.png" alt="Z - 箍缩" width = "500">
<center id='f5'><span style='font-weight:bold'>Fig 5. Z - 箍缩</span></center>

这样, 我们就可以更具需要的等离子体压强分布计算应该采用什么样的电流分布, 或者根据已有的电流分布计算会得到什么样的等离子体压强分布.

在这种位型下, $B_{z} = 0$, 这意味着等离子体是不稳定的(后面会讨论). 在强电工程技术的研究中会需要利用这种不稳定性来设计具有"自然"的快速响应性质的过载保护开关. 惯性约束聚变中, 也可以采用这种方案: 在非常细的丝状导线上同非常强的电流使导线融化成等离子体, 电流产生的洛伦兹力 $\mathbfit{J} \times \mathbfit{B}$ 会朝着中心来"箍缩"这些等离子体, 从而产生高能量粒子和 X 射线引发聚变. 这种装置作为强 X 射线源以及强脉冲聚变中子源也有着广泛的应用前景.

### $\theta$ 箍缩

如果电流方向在 $\theta$ 方向, 则产生的磁场为 $\mathbfit{B} = \hat{z}B_{z}(r)$, 如图6所示.

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-20230908190542.png" alt="θ - 箍缩" width="300">
<center id='f6'><span style='font-weight:bold'>Fig 6. θ - 箍缩</span></center>

同样的, 我们可以利用平衡方程得到以下的关系:

$$
\begin{equation}
    \begin{aligned}
        \left(p + \frac{B^{2}}{8 \pi}\right)_{r < a} = \frac{B^{2}(a)}{8 \pi}
    \end{aligned}
\end{equation}
$$

$r = a$ 表示等离子体的边界, 同样的我们需要从电流分布计算压强分布, 或者根据压强分布计算所需的电流分布. 同时, 在这种位型下 $B_{\theta} = 0$, 等离子体"非常安全(稳定)", 其稳定性我们也放到下一节中论述. 这也意味着该位型下没有轴向的约束(单粒子运动中平行于磁场方向是不会受到力的), 磁镜和环形约束可以用来解决这一问题.

### 磁镜

将 $\theta$ - 箍缩中等离子体柱两端的磁场 $B_{z}$, 我们就可以得到一个"磁镜"位型, 如图7所示.

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-20230908195732.png" alt="磁镜" width="300">
<center id='f7'><span style='font-weight:bold'>Fig 7. 磁镜</span></center>

这种位型通常被称为"线性装置", 曾经是磁约束等离子体研究的最重要装置. 伴随磁镜装置的还有一个很重要的概念, "绝热不变量". 磁镜装置的第一个不变量是"磁矩不变量", 即带电粒子在围绕磁力线做高频回旋运动时, 在长时间尺度上我们可以认为粒子单位质量的回旋运动产生的磁矩

$$
\begin{equation}
    \begin{aligned}
        \mu = \frac{v_{\perp}^2}{2 B}
    \end{aligned}
\end{equation}
$$

是一个近似的守恒量, 沿着磁力线 $l$, 粒子单位质量的动能可以写成:

$$
\begin{equation}
    \begin{aligned}
        \varepsilon = \mu B(l) + \frac{1}{2} v_{\parallel}^{2}
    \end{aligned}
\end{equation}
$$

这可以看成带电粒子沿着磁力线在"磁势阱" $\mu B(l)$ 中的运动. 在磁场的极小值 $B_{\min }$ 两侧如果有一个极大值 $B_{\max }$, 那么对于 $\varepsilon \leq \mu B(l)$ 的粒子会被磁势阱捕获, 从而在两个极大值之间"弹跳(bounce)". 对于更长的时间, 这个弹跳的周期运动会给我们第二个绝热不变量:"弹跳不变量". 再加上磁场曲率的存在, 带电粒子会在跨越磁力线的方向上存在漂移, 这个运动近似是一个围绕磁镜圆形截面的周期运动. 在非常长的时间尺度下, 我们将得到有关漂移的第三个绝热不变量. 一般来说, 磁约束等离子体中很少用到后面一种不变量. 另外, 地球磁场的偶极磁场也可以近似地看成是一个磁镜系统, 并且这三种绝热不变量在地球磁层等离子体中的研究是非常重要的. 由于磁势阱的存在, 这种磁约束位型下, 带电粒子的速度空间存在"损失锥(loss cone)"不稳定性, 这将大大影响等离子体约束的时间.

### 环形约束和托卡马克

为了解决轴向上没有约束的问题, 我们将 $\theta$ - 约束中的环形线圈围成一个圆环(图8绿色部分), 但此时由 $B_{z}$ 弯成的环向场在环内侧比环外侧强, 导致指向环内测的磁场梯度. 根据单粒子运动的结论, 这会导致垂直于这个梯度方向的漂移. 因此, 为了消除这个漂移, 我们需要在原本的场上叠加一个极向场(图8的中心螺管线). 这就是托卡马克装置的设计思路.

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-tokamak.png" alt="托卡马克(绿色的是环形线圈)" width="300">
<center id='f8'><span style='font-weight:bold'>Fig 8. 托卡马克(绿色的是环形线圈)</span></center>

很显然的, 环向场要比极向场强得多, 极向场的引入使得磁面拓扑呈环状, 每条磁力线都会经历环的内侧和外侧, 而因为向环内的磁场梯度的存在, 使得一条磁力线上会有环内侧的强场区和环外侧的弱场区, 这构成了一个"磁镜"位型, 这种特殊的磁镜效应对粒子的捕获是托卡马克等离子体的一个非常重要的性质. 这种环形约束的平衡是一种二维平衡, 接下来就讨论二维平衡位型满足的条件.

## 一维平衡, 螺旋箍缩

### 一维圆柱等离子体的平衡

我们知道轴对称的柱状等离子体($\theta$ - 箍缩)的物理量具有 $f = f(r)$ 的形式, 并且 $B_{r} = 0$. 因此, 磁面方程可以写成 $r = r_{0}$ 的形式. 根据静态平衡方程我们可以得到:

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}}{\mathrm{d}r} \left(p + \frac{B^{2}}{8 \pi}\right) = \frac{B^{2}}{4 \pi} \kappa(r) = -\frac{B_{\theta}^{2}}{4 \pi r} \left(\text{因为圆的曲率为} -\frac{1}{r}\right)
    \end{aligned}
\end{equation}
$$

如果既有环向场($\theta$), 又有极向场($z$), 也就是说磁场可以被写成: $\mathbfit{B} = \hat{\theta} B_{\theta}(r) + \hat{z} B_{z}(r)$, 那么静态平衡得到的结果将会变成:

$$
\begin{equation}
    \begin{aligned}
        \frac{\mathrm{d}}{\mathrm{d}r} \left(p + \frac{B_{\theta}^{2}}{8 \pi} + \frac{B_{z}^{2}}{8 \pi}\right) = \frac{B_{\theta}^{2}}{4 \pi r}
    \end{aligned}
\end{equation}
$$

由于这种位型的磁力线和电流都是螺旋形的, 所以我们一般称之为"螺旋箍缩". 在这种平衡下, $\nabla \cdot \mathbfit{B} = 0$ 显然是满足的(因为没有 $B_{r}$, 即没有向外发射的无法闭合的磁力线). 因此我们需要通过一个方程(式 38)来决定三个未知函数($p, B_{\theta}, B_{z}$), 其中轴向(z 方向)和环向(θ 方向)自由度由周期条件来确定; 另外一个则可以用 r 的两个边界条件($r = 0$ 和 $r = a$)来确定.

### 安全因子

现在我们来看磁场的两个分量是如何绕成磁面的, 在这样的螺旋形磁场位型中, 一根磁力线需要同时经过大小两个半径(主半径 R 以及小半径 r)的圆(图9所示, 红色为小圆, 蓝色为大圆, 这两个圆分别对应着极向和环向的磁场, 大小半径的概念在托卡马克核聚变的研究中也经常使用).

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-螺旋箍缩.png" alt="螺旋箍缩" width="500">
<center id='f9'><span style='font-weight:bold'>Fig 9. 螺旋箍缩</span></center>

根据最开始的托卡马克坐标(θ, r, z)磁力线的方程, 我们可以得到:

$$
\begin{equation}
    \begin{aligned}
        \frac{r \mathrm{d}\theta}{\mathrm{d}z} &= \frac{B_{\theta}}{B_{z}} \\
        \Rightarrow \frac{r \mathrm{d}\theta}{\mathrm{d}z} &= \frac{B_{\theta} 2 \pi R}{B_{z} 2 \pi R} \\
        \Rightarrow \frac{2 \pi R \mathrm{\,d}\theta}{\mathrm{\,d}z} &= \frac{B_{\theta} 2 \pi R}{B_{z} r} \\
        \Rightarrow \frac{\mathrm{\,d}z}{2 \pi R} &= \frac{B_{z} r}{B_{\theta} 2 \pi R \mathrm{\,d}\theta}
    \end{aligned}
\end{equation}
$$

这里我们一个叫"安全因子(safety factor)"的量, 也就是:

$$
\begin{equation}
    \begin{aligned}
        q(r) \equiv \frac{r B_{z}(r)}{R B_{\theta}(r)}
    \end{aligned}
\end{equation}
$$

其中由于 $B_{\theta}$ 以及 $B_{z}$ 都会随着 r 变化, 所以安全因子也会随着 r 进行变化. 有了安全因子的定义之后我们可以得到: 

$$(\Delta z)_{\Delta \theta = 2 \pi} = q(r) 2 \pi R$$

这也就意味着实际上安全因子表示磁力线在 $\hat{\theta}$ 方向上转完一整圈时在 $\hat{z}$ 方向上转过的圈数(也可以说是走过的周期数). 在下一节中我们可以看到安全因子和等离子体平衡的稳定性有关系, 这也是安全因子这个名字的原因. 在 z - 箍缩中, 由于 $B_{z} = 0$, 安全因子为 0, 等离子体是不安全的, 也就是说不稳定的. 而在 θ - 箍缩下, $B_{\theta} = 0$, $q \to  \infty$, 等离子体是很安全的, 也就是说是"绝对稳定"的.

另外, 由于 $q(r)$ 是连续变化的, 因此对于 $q(r)$ 我们可以取到无穷多分段连续的无理数, 也可以取到无穷多个"分立"的有理数(也就是有理数在数轴上的分布是分立的). 当我们取到有理数 $q(r) = m/n$ 的磁面(有理磁面)时, 磁力线环绕大圆 m 圈, 绕小圆 n 圈后会回到最开始的地方首尾相接, 这也就意味着此时的磁力线是无法铺满整个磁面的. 实际上就是有理磁面上的磁力线总是在重复之前的轨迹, 一条磁力线是没法遍历磁面上所有的点, 但无理磁面上的磁力线因为不会回到原来的起点, 不会重复之前走过的路, 所以会在磁面上遍历所有的位置. 从测度上来说, 有理磁面上的磁力线所占据的区域测度为零, 物理上来说这个磁面是"软"的, 容易出现不稳定性. 因此相对来说, 无理磁面具有很好的物理性质. 关于这个问题, 王晓钢老师的[博客](https://blog.sciencenet.cn/blog-39346-286012.html)有更详细的解释(<span class='mohu'>实际上也差不多, 哈哈哈哈哈</span>).

## Grad - Shafranov 方程

接下来考虑更复杂的环形约束等离子体的二维平衡分布及其性质, 二维平衡满足的方程为 Grad - Shafranov 方程, 用来研究托卡马克等离子体, 这里我们先进一步引入托卡马克坐标系.

### 托卡马克(Tokamak)坐标系

一般由于托卡马克甜甜圈形状的特征我们可以采用柱坐标($R, \zeta, Z$)或者环坐标($r, \theta, z$)来描述托卡马克位型, 其中 $\hat{z}$ 为弧长的方向.

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-托卡马克坐标系.png" alt="托卡马克坐标系" width="400">
<center id='f10'><span style='font-weight:bold'>Fig 10. 托卡马克坐标系</span></center>

我们可以很轻松地给出这两个坐标系之间的关系:

$$
\begin{equation}
    \begin{aligned}
        R &= R_{0} + r \cos \theta \\
        \zeta &= -\frac{z}{R_{0}} \\
        Z &= r \sin \theta
    \end{aligned}
\end{equation}
$$

很显然的, 这样的平衡是轴对称的, 也就是 $\mathrm{d}/\mathrm{d}\zeta = 0$. 取磁面 $\psi = \psi(R, Z)$, 此时有 $\frac{\partial \psi}{\partial \zeta}=0$, 前面提到过磁力线可以看成是两个曲面的交线, 将这两个曲面选择成相互正交的曲面可以得到一个正交坐标系, 对应到托卡马克中, 我们可以选择磁面 $\psi$ 和 $-\hat{z}$ 方向对应的曲面, 根据磁场的表达式 $\ref{eq:bfield}$, $\ref{eq:B2}$, 我们可以得到:

$$
\begin{equation}
    \begin{aligned}
        \mathbfit{B} = -F(\psi)\hat{z} + \hat{z} \times \nabla \psi
    \end{aligned}
\end{equation}
$$

由于 $\hat{\zeta}$ 和 $\hat{z}$ 是相互对应的, (用 $\hat{\zeta}/R$ 取代 $\hat{z}$), 可以得到: 

$$
\begin{equation}
    \begin{aligned}
        \mathbfit{B} &= \frac{F(\psi)}{R} \hat{\zeta} - \frac{\hat{\zeta}}{R} \times \nabla \psi \\
        &= \mathbfit{B}_{\zeta} - \frac{\hat{\zeta}}{R} \times \nabla \psi \\
        &= \mathbfit{B}_{\zeta} - \frac{\hat{\zeta}}{R} \times \left(\frac{\partial \psi}{\partial R} + \frac{\partial \psi}{\partial Z}\right) \\
        &= \mathbfit{B}_{\zeta} + \frac{1}{R} \frac{\partial \psi}{\partial R} \hat{Z} - \frac{1}{R} \frac{\partial \psi}{\partial Z} \hat{R}
    \end{aligned}
\end{equation}
$$

也就是说:

$$
\begin{equation}
    \begin{aligned}
        B_{\zeta} &= \frac{F(\psi)}{R} \\
        B_{R} &= -\frac{1}{R} \frac{\partial \psi}{\partial Z} \\
        B_{Z} &= \frac{1}{R} \frac{\partial \psi}{\partial R}
    \end{aligned}
\end{equation}
$$

我们假设磁轴在 $R = R_{a}$, $Z = 0$ 的位置, 并且 $\psi(R_{a}, 0) = 0$. 计算极向磁通(可以理解为穿过 $z = 0$ 平面的磁通量):

$$
\begin{equation}
    \begin{aligned}
        \Psi_{p} = \iint_{Z = 0} B_{z} \mathrm{d}S = \int_{0}^{2 \pi}\mathrm{\,d}\zeta \int _{R_{a}}^{R} R \left[\frac{1}{R} \frac{\partial \psi}{\partial R}\right] \mathrm{\,d}R = 2 \pi \psi
    \end{aligned}
\end{equation}
$$

### Grad - Shafranov 方程

#### 等离子体电流密度

在等离子体平衡的小节中, 我们知道一些基本的关系式(切换成国际单位制)

$$
\begin{equation}
    \begin{aligned}
        \mu_0\mathbfit{J}&=\nabla \times \mathbfit{B} \\
        \nabla p &= \mathbfit{J}\times \mathbfit{B}
    \end{aligned}
\end{equation}
$$

通过简单的推导我们可以得到（注意我们采用的坐标系的正交关系是：R, $\zeta$, Z 是一种极向圆柱坐标系, 相关信息可以在[此处找到](https://prefetch.eu/know/concept/polar-cylindrical-coordinates/)）：

$$
\begin{equation}
    \begin{aligned}
        \mu_{0} \mathbf{J}=\nabla \times \mathbf{B}=-\frac{\partial B_{\zeta}}{\partial Z} \hat{\mathbf{R}}+\left(\frac{\partial B_{R}}{\partial Z}-\frac{\partial B_{Z}}{\partial R}\right) \hat{\zeta}+ \left(\frac{\partial B_{\zeta}}{\partial R}+\frac{B_{\zeta}}{R} \right)\hat{\mathbf{Z}}
    \end{aligned}
\end{equation}
$$

由于 $F(\psi) = R B_{\zeta}$, 因此极向的电流密度就可以直接得到：

$$
\begin{equation}
    \begin{aligned}
        \mu_0 J_{R} &= - \frac{1}{R} \frac{\partial F(\psi)}{\partial R} \\
        \mu_0 J_{Z} &= \frac{1}{R}\frac{\partial \left(R B_{\zeta}\right)}{\partial R} = \frac{1}{R} \frac{\partial F(\psi)}{\partial R}
    \end{aligned}
\end{equation}
$$

在我们感兴趣的大部分情况中极向电流都比较小从而可以忽略. 同样的, 环向电流也可以从上面的式子中得到:

$$
\begin{equation}
    \begin{aligned}
        \mu_{0} J_{\zeta} & =\frac{\partial B_{R}}{\partial Z}-\frac{\partial B_{Z}}{\partial R} \\ & =-\frac{1}{R} \frac{\partial^{2} \psi}{\partial Z^{2}}-\frac{\partial}{\partial R}\left(\frac{1}{R} \frac{\partial \psi}{\partial R}\right)
    \end{aligned}
\end{equation}
$$

由方程(46)的第二项可以得到:

$$
\begin{equation}
    \begin{aligned}
        \nabla P=\mathbfit{J} \times \mathbfit{B}=\left[\begin{array}{c}J_{\zeta} B_{z}-J_{z} B_{\zeta} \\ J_{z} B_{r}-J_{r} B_{z} \\ J_{r} B_{\zeta}-J_{\zeta} B_{r}\end{array}\right]
    \end{aligned}
\end{equation}
$$

现在我们考虑平行于磁场方向上的力是平衡的, 也就是说在上述方程的基础上点乘磁场我们可以得到:

$$
\begin{equation}
    \begin{aligned}
        0=\mathbfit{B} \cdot \nabla P
    \end{aligned}
\end{equation}
$$

这暗示沿着磁场线 $P$ 将会是一个常数值(这样的形式可以满足该方程的解, 也许还有其他形式的解, 但已有证明可以说明对称位型下这个解确实是满足的). 也就是前面提到的 $P=P(\psi)$. 于是上式变成了:

$$
\begin{equation}
    \begin{aligned}
        0=\mathbfit{B} \cdot \frac{\mathrm{d} P}{\mathrm{d} \psi} \nabla \psi
    \end{aligned}
\end{equation}
$$

再考虑环向上的平衡, 根据方程(50)我们有:

$$
\begin{equation}
    \begin{aligned}
        J_{Z} B_{R}-J_{R}B_{Z}=\frac{1}{R} \frac{\partial P}{\partial \zeta}=0\ (P=P(\psi) \rightarrow \partial P/\partial \zeta=0)
    \end{aligned}
\end{equation}
$$

将极向电流密度依次代入, 得到:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial F}{\partial R} B_{R}+\frac{\partial F}{\partial Z} B_{Z}=0
    \end{aligned}
\end{equation}
$$

$$
\begin{equation}
    \begin{aligned}        
        \mathbfit{B} \cdot \nabla g=0\ (\partial F(\psi)/\partial \zeta=0)
    \end{aligned}
\end{equation}
$$

基于上述相同的原因, 我们也可以说明 $F=F(\psi)$ 的成立. 这个函数通常被称为 **极向电流密度函数**, 具体的原因可以从参考文献中找到.

最后我们来讨论沿着主半径方向的力学平衡:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial P}{\partial R}&=J_{\zeta} B_{Z}-J_{Z} B_{\zeta} \\
        &=\frac{1}{\mu_{0}}\left(\frac{\partial B_{R}}{\partial Z}-\frac{\partial B_{Z}}{\partial R}\right) B_{Z}-\frac{1}{\mu_{0} R} \frac{\partial\left(R B_{\zeta}\right)}{\partial R} B_{\zeta} \\ 
        &=-\frac{1}{\mu_{0}}\left(\frac{\partial}{\partial Z}\left(\frac{1}{R} \frac{\partial \psi}{\partial Z}\right)+\frac{\partial}{\partial R}\left(\frac{1}{R} \frac{\partial \psi}{\partial R}\right)\right) \frac{1}{R} \frac{\partial \psi}{\partial R}-\frac{1}{\mu_{0} R} \frac{\partial\left(R B_{\zeta}\right)}{\partial R} B_{\zeta} \\ 
        &=-\frac{1}{\mu_{0} R}\left(\frac{1}{R} \frac{\partial^{2} \psi}{\partial Z^{2}}+\frac{\partial}{\partial R}\left(\frac{1}{R} \frac{\partial \psi}{\partial R}\right)\right) \frac{\partial \psi}{\partial R}-\frac{1}{\mu_{0} R} \frac{\partial\left(R B_{\zeta}\right)}{\partial R} B_{\zeta} \\
        \Longrightarrow &\frac{\partial P}{\partial \psi} \frac{\partial \psi}{\partial R}=-\frac{1}{\mu_{0} R}\left(\frac{1}{R} \frac{\partial^{2} \psi}{\partial Z^{2}}+\frac{\partial}{\partial R}\left(\frac{1}{R} \frac{\partial \psi}{\partial R}\right)\right) \frac{\partial \psi}{\partial R}-\frac{1}{\mu_{0} R} \frac{\partial\left(R B_{\zeta}\right)}{\partial \psi} \frac{\partial \psi}{\partial R} B_{\zeta}
    \end{aligned}
\end{equation}
$$

将最后得到的方程两边同时除上 $\partial \psi/\partial R$ 乘上 $\mu_{0} r^{2}$, 我们就可以得到 **Grad-Shafranov 方程**, 它可以给出环形位型下的等离子体平衡条件:

$$
\begin{equation}
    \begin{aligned}
        \frac{\partial^{2} \psi}{\partial Z^{2}}+R \frac{\partial}{\partial R}\left(\frac{1}{R} \frac{\partial \psi}{\partial R}\right)=-\mu_{0} R^{2} \frac{\mathrm{d} P}{\mathrm{d} \psi}-F(\psi) \frac{\mathrm{d} F(\psi)}{\mathrm{d} \psi}
    \end{aligned}
\end{equation}
$$

我们将与坐标系相关的部分抽取出来, 即令: 

$$
\begin{equation}
    \begin{aligned}
        \Delta^{*} \equiv \frac{\partial^{2}}{\partial Z^{2}}+R \frac{\partial}{\partial R}\left(\frac{1}{R} \frac{\partial}{\partial R}\right)
    \end{aligned}
\end{equation}
$$

原方程可以简化为:

$$
\begin{equation}
    \begin{aligned}
        \Delta^{*} \psi=-\mu_{0} R^{2} \frac{\mathrm{d} P}{\mathrm{d} \psi}-F \frac{\mathrm{d} F}{\mathrm{d} \psi}
    \end{aligned}
\end{equation}
$$

在环形坐标系 $(r, \theta, z)$ 下, 平衡状态下有 $\partial/\partial \zeta=-R_{0} \partial/\partial z=0$, 我们得到:

$$
\begin{equation}
    \begin{aligned}
        \Delta^{*}=\nabla^{2}-\frac{2}{R_{0}+r \cos{\theta}} \left(\cos{\theta}\frac{\partial}{\partial r}-\sin{\theta}\frac{1}{r} \frac{\partial }{\partial \theta} \right)
    \end{aligned}
\end{equation}
$$

有关此方程的解以及平衡控制的问题都是磁约束聚变领域的前沿问题, 很多论文对此进行研究, 在此就不在赘述.

# 参考文献

{% note info %}
1. https://prefetch.eu/know/concept/grad-shafranov-equation/
2. https://www.questjournals.org/jram/papers/v7-i4/E07043438.pdf
3. https://en.wikipedia.org/wiki/Grad%E2%80%93Shafranov_equation
4. https://youjunhu.github.io/research_notes/tokamak_equilibrium_htlatex/tokamak_equilibrium.html
{% endnote %}