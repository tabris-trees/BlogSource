---
title: 理想磁流体平衡
date: 2022-10-13 23:39:17
cover: https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/MHD-E-20221013234420.png
tags:
- 等离子体物理
- 磁流体力学
- 磁约束核聚变
categories: [笔记,等离子体物理]
description: 基于王晓钢老师的《等离子体物理》第二章的内容对磁流体平衡的内容进行简单介绍
---

<center><h1>理想磁流体力学</h1></center>

{% note info %}
本文是王晓刚老师《等离子体物理基础》第二章内容的笔记整理，方便此后查阅
{% endnote %}

从物理上来看，一个系统总是趋于能量最低的平衡状态，此时的运动形式相对简单。一般来说，我们将磁流体的平衡指的是**力学平衡（磁流体力学的平衡）**，而非热力学平衡（速度分布的平衡，对应的是动理学理论的平衡）。这种平衡对于可控核聚变来说是非常重要的，我们需要将温度极高的等离子体通过外部力场约束在固定范围内以提供聚变产生的原材料，完成这一目标的首要条件就是做到磁流体平衡。

## 磁场位型与磁面

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