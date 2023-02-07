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

![PPB-idelMHDequi-f1](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/PPB-idelMHDequi-EBC5A2913971E69F7D1376D20F6F7EF4.jpg)

<center id='f1'><span style='font-weight:bold'>Fig 1 上述过程的几何描述</span></center>

这两个曲面的选择可以是任意的，所以同一个磁场可能对应多种不同的选择进行描述。因此，我们进一步可以把磁场写成：

$$\begin{equation}
    \begin{aligned}
        \mathbfit{B} = F(\psi) \nabla \zeta + \nabla \psi \times \nabla \zeta
    \end{aligned}
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
        \nabla \left(p + \frac{B^2}{8\pi}\right) = \frac{\mathbfit{B} \cdot \nabla \mathbfit{B}}{4\pi} = \hat{b} \nabla_{\parallel} \left(\frac{B^2}{8\pi}\right) + \mathbfit{\kappa} \frac{B^2}{4\pi}
    \end{aligned}
\end{equation}$$

其中, 磁场单位矢量 $\hat{b} \equiv \mathbfit{B}/B$, 平行磁场的梯度 $\nabla_{\parallel} \equiv \hat{b} \cdot \nabla$, $\mathbfit{\kappa} \equiv \hat{b} \cdot \nabla \hat{b} = \nabla_{\parallel} \hat{b}$. 根据矢量与张量的点乘运算 $\mathbf{A} \cdot \mathbfit{A} = \sum_{ij} T_{ij}\mathbfit{e}_i\mathbfit{e}_j \cdot \sum_{l} f_l\mathbfit{e}_l = \sum_{ijl} T_{ij}f_{l}\mathbfit{e}_{i} \delta_{jl} = \sum _{ij} T_{ij} f_{j} e_{i},\ \mathbfit{A} \cdot \mathbf{A} = \sum _{ij} f_{i} T_{ij} e_{j}$, 所有带有平行分量的张量都会消失, 所以很明显 $\kappa$ 是垂直磁场方向的. 于是上式还可以写成是分量的形式:

$$\begin{equation}
    \begin{aligned}
        \nabla_{\perp} \left(p + \frac{B^2}{8\pi}\right) = \mathbfit{\kappa} \frac{B^{2}}{4\pi},\ \nabla_{\parallel} p = 0
    \end{aligned}
\end{equation}$$