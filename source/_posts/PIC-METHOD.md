---
title: 等离子体粒子模拟方法（Particel in Cell）介绍
tags:
  - 等离子体
  - 计算机模拟
date: 2021-10-26 18:18:37
index_img: https://tse3-mm.cn.bing.net/th/id/OIP-C.pwhXq_zNLgQ4rBYaBVqQrwHaDt?pid=ImgDet&rs=1
cover: https://tse3-mm.cn.bing.net/th/id/OIP-C.pwhXq_zNLgQ4rBYaBVqQrwHaDt?pid=ImgDet&rs=1
categories: [科研,等离子体物理,模拟]
description: 关于等离子体PIC模拟方法的理论知识(*^_^*)
---


{% note primary %}

众所周知，等离子体有三种不同的描述方法：单粒子、磁流体力学以及动理论描述。粒子模拟方法是结合磁流体力学和动理论描述的一种近似模拟方法，其基本方法是对进行外加电磁场和自洽场的耦合运算，对单个带电粒子的运动进行跟踪，通过对网格中的粒子进行统计得到整个系统的状态。因为涉及到大量的粒子，所以该方法的计算量一般来说比较大，根据具体问题，需要做适当的简化才能在实际的计算机上运行。

{% endnote %}

PIC（Particle in Cell，粒子云网格法）模拟是最常用的一种简化版本的粒子模拟方法。其需要将连续的模拟空间划分为许多大小相等的离散空间，也就是图示的网格，网格线的交点称为格点或者节点。物理量通常就是定义在网格的格点上的。

![PIC网格示意图](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/image-20211025233310966.png)

粒子模拟的理论基础同样是带电粒子的运动方程以及麦克斯韦电磁场方程组：

$$
\Large
\left\{\begin{array}{c}
\nabla \times \mathbf{E}=-\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{H}=\frac{\partial \mathbf{D}}{\partial t}+\mathbf{J} \\
\nabla \cdot \mathbf{D}=\rho \\
\nabla \cdot \mathbf{B}=0
\end{array}\right.  \tag{1}
$$

$$
\Large
\left\{\begin{array}{l}
\frac{d \mathbf{v}}{d t}=\frac{q}{m}(\mathbf{E}+\mathbf{V} \times \mathbf{B}) \\
\frac{d \mathbf{r}}{d t}=\mathbf{v}
\end{array}\right. \tag{2}
$$

整个模拟步骤如下：

{% mermaid %}
graph TD
    A[初始各个粒子所在的位置和速度]--粒子分布函数-->2[网格点上的电荷密度和电流密度]
    2-->|麦克斯韦方程组| B(网格点电磁场分布情况)
    B --粒子运动方程--> C(下一时刻粒子的位置和速度)
    C --粒子分布函数--> 2
    C --统计平均--> 宏观性质和运动规律
{% endmermaid %}

对于实际问题通常只需要关注特定的几个物理量而不需要求出方程组中全部的未知量，因此只需要解出麦克斯韦方程组的一部分即可，按照这样简化的程度，或者说我们关注的物理量的区别可以将等离子体粒子模拟分为：

- 静电模型
- 电磁模型
- 静磁模型

# 粒子模拟基本模型的求解🍇

## 静电模型

在类似等离子体振荡（朗缪尔波）、离子声波以及双流不稳定性等问题中，等离子体的行为主要有电荷分离引起的静电场所主导的。这些问题只需要求解麦克斯韦方程组中的泊松方程部分即可，根据波动的特征时间是$\omega_{p}^{-1}$，计算的时间不长可以取得比较大，从而节省计算时间，相对来说比较简单。其过程如下：

1. 利用快速傅里叶变换，有网格电荷密度$\rho_{i,j}$求出电荷密度的象函数$\rho_{n,m}$；
2. 利用泊松方程的快速傅里叶变换形式求解电势的象函数$\phi_{n,m}$；
3. 再通过快速傅里叶变换的逆变换得到网格电势$\phi_{i,j}$；
4. 根据网格电势可以得到网格点处的电场（最简单的甚至可以使用差分形式）；
5. <span style='background: red'>由距离最近的四个网格点的电场求出粒子电荷密度的分布$\rho$ </span>[^1]以及电场力$\mathbf{F}$；
6. 根据运动方程求出下一时刻粒子的速度和坐标；
7. 重复上述步骤。

对于以为经典模型除了利用快速傅里叶变换的方式求解泊松方程，也可以使用三对角矩阵追赶法：

1. FFT方法

![](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/image-20211025215145928.png)

2. 矩阵追赶方法（解三角矩阵）

   ![](https://hexo-1301133429.cos.ap-chengdu.myqcloud.com/post/image-20211025222930010.png)

## 电磁模型

电磁模型需要通过完整的麦克斯韦方程组求解电磁场，方程相对来说比较复杂，特征时间是$\lambda_D/c$，所以时间步长取得比较小，对计算资源的消耗较大，但是问题也相对更加重要（类似各种类型的电磁波的产生、传输以及消耗）。简化的过程步骤如下所示：

{% mermaid %}
graph TD;
    1(初始化:给定满足粒子分布函数的随机初始位置和速度)-->2(空间网格点上的电荷密度ρ和电流密度J分布);
    2--快速傅立叶变换FFT-->3(象空间的电荷密度和电流密度分布);
    3-->4(在象空间求解麦克斯韦方程组得到电磁场);
    4--快速傅里叶逆变换-->5(空间网格上的电磁场);
    5--运动方程-->6(下一时刻的位置和速度);
    6--t+Δt-->2;
    6-->7(结束);
{% endmermaid %}

## 静磁模型（目前还稍微有点问题）

研究磁约束、单相磁流体以及阿尔芬波等问题时，虽然同样会用到麦克斯韦方程组，但是忽略了位移电流的贡献，所以不存在电磁转换的问题。此时问题的特征时间是$\omega_{p}^{-1}$或$\omega_e^{-1}$，这种情况也相对比较简单。研究阿尔芬波与粒子的相互作用时主要采用着一种方法，所以对此作较为详细的描述：

在这类问题中，只考虑自洽场，忽略位移电流，这样在傅里叶空间中场方程的分量形式为：
$$
ik \times E_T(k,t) = -\frac{1}{c} \frac{\partial B_T}{\partial t} \tag{3}\\
$$

$$
ik \times B_T(k,t) = \frac{4 \pi}{c} J_T(k,t) \tag{4}
$$

$$
ik \cdot E_L(k,t) = 4 \pi \rho(k) \tag{5}
$$

有时候在讨论的问题中，静电场不是主要的也可以忽略，这样就只剩下$(3)$和$(4)$式联立消去$B_T$，得到：
$$
-k^{2} E_{T}(k, t)=\frac{4 \pi}{c^{2}} \frac{\partial J_{T}}{\partial t} \tag{6}
$$
<span style="background: red">由于忽略位移电流而破坏了方程组的平衡</span>[^2]，所以需要在电流上加上一个修正项：
$$
J_T = J_{T0} + J_{Tc} \tag{7}
$$
其中$J_{Tc}$为修正项，且满足以下的方程：
$$
\left\{\begin{array}{c}
\frac{\partial J_{T 0}}{\partial t}=\bar{n} e \frac{e E_{T}}{m}=\frac{\bar\omega_{p e}}{4 \pi} E_{T}(k, t) \\
\frac{\partial J_{T}}{\partial t}=\frac{\partial J_{T 0}}{\partial t}+\frac{\partial J_{T c}}{\partial t}
\end{array}\right. \tag{8}
$$
$\bar{n}$是平均电子密度，$\bar{\omega}_{pe}$是平均电子等离子体振荡频率。综合上面各式进行化简可以得到：
$$
\left(-k^{2} + \frac{\bar{\omega}_{p e}^{2}}{c^{2}}\right) E_{T}(k, t)=\frac{4 \pi}{c^{2}} \frac{\partial J_{T c}}{\partial t} \tag{9}
$$
利用迭代法求得电场$E_{T}(k,t)$代回$(3)$式，即可求出$B_{T}(k,t)$。逆变换回真实空间，得到各个网格点的电磁场，经过合适的插值，得到粒子所在位置的电磁场，并推动粒子运动。

{% note danger %}
[^1,2]: 红色高亮是目前还搞不明白的地方
{% endnote %}

{% btn '',待更新😀,far fa-hand-point-right,blue block center larger %}