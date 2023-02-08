---
title: 理想磁流体平衡
date: 2023-02-07 14:31:45
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/MHD-E-20221013234420.png
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

<img src="https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-EBC5A2913971E69F7D1376D20F6F7EF4.jpg" alt = "PPB-idelMHDequi-f1" width = "300"><center id='f1'><span style='font-weight:bold'>Fig 1 上述过程的几何描述</span></center>

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

这个时候我们看到这种两个叉乘在一起的一般都会利用矢量恒等式进行化简, 回去翻翻矢量恒等式的列表, 发现有 $\nabla (\mathbfit{A} \cdot \mathbfit{B}) = \mathbfit{A} \times (\nabla \mathbfit{B}) + \mathbfit{B} \times (\nabla \times \mathbfit{A}) + \mathbfit{A} \cdot \nabla \mathbfit{B} + \mathbfit{B} \cdot \nabla \mathbfit{A}$. 把这里的磁场带进去就有:

$$\begin{equation}
    \begin{aligned}
        (\nabla \times \mathbfit{B}) \times \mathbfit{B} = \frac{\nabla B^2}{2} + \mathbfit{B} \cdot \nabla \mathbfit{B}
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